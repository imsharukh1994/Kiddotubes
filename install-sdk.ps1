$ErrorActionPreference = 'Stop'
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

$sdkDir = "C:\Users\Shaharukh Mithagari\AppData\Local\Android\Sdk"
$zipPath = "$env:TEMP\cmdline-tools-v4.zip"
$url = "https://dl.google.com/android/repository/commandlinetools-win-11076708_latest.zip"

Write-Host "Downloading Android Command Line Tools..."
(New-Object System.Net.WebClient).DownloadFile($url, $zipPath)
Write-Host "Download finished."

Write-Host "Extracting to $sdkDir..."
$tempExtract = "$env:TEMP\extracted-tools-4"
if (Test-Path $tempExtract) { Remove-Item $tempExtract -Recurse -Force }
Expand-Archive -Path $zipPath -DestinationPath $tempExtract -Force

$latestDir = "$sdkDir\cmdline-tools\latest"
New-Item -ItemType Directory -Force -Path $latestDir | Out-Null

Copy-Item -Path "$tempExtract\cmdline-tools\*" -Destination $latestDir -Recurse -Force
Remove-Item $tempExtract -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item $zipPath -Force -ErrorAction SilentlyContinue

Write-Host "Verifying sdkmanager.bat..."
$sdkManager = "$latestDir\bin\sdkmanager.bat"
if (Test-Path $sdkManager) {
    Write-Host "SUCCESS! sdkmanager.bat is ready at: $sdkManager"
} else {
    Write-Host "ERROR: sdkmanager.bat missing"
}
