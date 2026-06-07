$ErrorActionPreference = "Stop"
Add-Type -AssemblyName System.Drawing
Add-Type -ReferencedAssemblies "System.Drawing" -TypeDefinition @"
using System;
using System.Drawing;
using System.Drawing.Imaging;
using System.Runtime.InteropServices;

public static class GarmentRecolorer {
  public static Bitmap Recolor(Bitmap source, string targetHex) {
    Color target = ColorTranslator.FromHtml(targetHex);
    Bitmap bitmap = new Bitmap(source.Width, source.Height, PixelFormat.Format32bppArgb);
    using (Graphics g = Graphics.FromImage(bitmap)) {
      g.DrawImage(source, 0, 0, source.Width, source.Height);
    }

    Rectangle rect = new Rectangle(0, 0, bitmap.Width, bitmap.Height);
    BitmapData data = bitmap.LockBits(rect, ImageLockMode.ReadWrite, PixelFormat.Format32bppArgb);
    int bytes = Math.Abs(data.Stride) * bitmap.Height;
    byte[] buffer = new byte[bytes];
    Marshal.Copy(data.Scan0, buffer, 0, bytes);

    for (int y = 0; y < bitmap.Height; y++) {
      int row = y * data.Stride;
      for (int x = 0; x < bitmap.Width; x++) {
        int i = row + x * 4;
        byte b = buffer[i];
        byte g = buffer[i + 1];
        byte r = buffer[i + 2];
        byte a = buffer[i + 3];
        int avg = (r + g + b) / 3;
        int max = Math.Max(r, Math.Max(g, b));
        int min = Math.Min(r, Math.Min(g, b));
        int spread = max - min;
        bool background = a == 0 || (r > 236 && g > 236 && b > 236) || (avg > 210 && spread < 22);
        if (!background) {
          double luma = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255.0;
          double detail = Math.Min(1.34, Math.Max(0.62, 0.72 + (luma * 0.62)));
          buffer[i] = Clamp(target.B * detail);
          buffer[i + 1] = Clamp(target.G * detail);
          buffer[i + 2] = Clamp(target.R * detail);
          buffer[i + 3] = a;
        }
      }
    }

    Marshal.Copy(buffer, 0, data.Scan0, bytes);
    bitmap.UnlockBits(data);
    return bitmap;
  }

  static byte Clamp(double value) {
    if (value < 0) return 0;
    if (value > 255) return 255;
    return (byte)value;
  }
}
"@

$root = Resolve-Path "."
$sourceRoot = Join-Path $root "public\assets\source"
$assetRoot = Join-Path $root "public\assets\garments"

$garments = @{
  "shirt" = "shirt-premium-sheet.png"
  "pants" = "pants-premium-sheet.png"
  "sport" = "sport-premium-sheet.png"
}

$views = @(
  @{ Name = "front"; Col = 0; Row = 0 },
  @{ Name = "front-3q-right"; Col = 1; Row = 0 },
  @{ Name = "right"; Col = 2; Row = 0 },
  @{ Name = "back"; Col = 0; Row = 1 },
  @{ Name = "left"; Col = 1; Row = 1 },
  @{ Name = "front-3q-left"; Col = 2; Row = 1 }
)

$colors = @{
  "sky-blue" = "#9fc0ee"
  "white" = "#f2f0ea"
  "navy" = "#14213d"
  "terracotta" = "#b86b46"
  "gray" = "#cfd2d6"
}

function New-Canvas($width, $height) {
  return New-Object System.Drawing.Bitmap $width, $height, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
}

function Save-View($sheet, $garment, $colorName, $colorHex, $view) {
  $cellW = [int]($sheet.Width / 3)
  $cellH = [int]($sheet.Height / 2)
  $srcRect = [System.Drawing.Rectangle]::new($view.Col * $cellW, $view.Row * $cellH, $cellW, $cellH)
  $cell = New-Canvas $cellW $cellH
  $cg = [System.Drawing.Graphics]::FromImage($cell)
  $cg.DrawImage($sheet, 0, 0, $srcRect, [System.Drawing.GraphicsUnit]::Pixel)
  $cg.Dispose()

  $recolored = [GarmentRecolorer]::Recolor($cell, $colorHex)
  $out = New-Canvas 900 900
  $g = [System.Drawing.Graphics]::FromImage($out)
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
  $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $g.Clear([System.Drawing.Color]::White)
  $g.DrawImage($recolored, 58, 58, 784, 784)

  $dir = Join-Path $assetRoot "$garment\$colorName"
  New-Item -ItemType Directory -Force -Path $dir | Out-Null
  $out.Save((Join-Path $dir "$($view.Name).png"), [System.Drawing.Imaging.ImageFormat]::Png)

  $g.Dispose()
  $out.Dispose()
  $recolored.Dispose()
  $cell.Dispose()
}

function Save-FabricDetail($garment, $colorName, $colorHex) {
  $target = [System.Drawing.ColorTranslator]::FromHtml($colorHex)
  $bmp = New-Canvas 900 900
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
  $g.Clear($target)
  $rand = New-Object System.Random 42

  for ($i = 0; $i -lt 900; $i += 7) {
    $alpha = if ($garment -eq "sport") { 38 } elseif ($garment -eq "pants") { 32 } else { 26 }
    $penLight = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb($alpha, 255, 255, 255)), 2
    $penDark = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(22, 7, 18, 47)), 1
    $g.DrawLine($penLight, $i, 0, $i + 120, 900)
    $g.DrawLine($penDark, 0, $i, 900, $i + 60)
    $penLight.Dispose()
    $penDark.Dispose()
  }

  for ($i = 0; $i -lt 1800; $i++) {
    $x = $rand.Next(0, 900)
    $y = $rand.Next(0, 900)
    $size = $rand.Next(1, 4)
    $brush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb($rand.Next(15, 42), 255, 255, 255))
    $g.FillEllipse($brush, $x, $y, $size, $size)
    $brush.Dispose()
  }

  $dir = Join-Path $assetRoot "$garment\$colorName"
  New-Item -ItemType Directory -Force -Path $dir | Out-Null
  $bmp.Save((Join-Path $dir "fabric-detail.png"), [System.Drawing.Imaging.ImageFormat]::Png)
  $g.Dispose()
  $bmp.Dispose()
}

foreach ($garment in $garments.Keys) {
  $sheetPath = Join-Path $sourceRoot $garments[$garment]
  if (-not (Test-Path $sheetPath)) {
    Write-Warning "Missing source sheet: $sheetPath"
    continue
  }
  $sheet = [System.Drawing.Bitmap]::FromFile($sheetPath)
  foreach ($colorName in $colors.Keys) {
    foreach ($view in $views) {
      Save-View $sheet $garment $colorName $colors[$colorName] $view
    }
    Save-FabricDetail $garment $colorName $colors[$colorName]
  }
  $sheet.Dispose()
}

Write-Host "Imported premium garment assets into $assetRoot"
