@echo off
set JAVA_HOME=C:\Program Files\Java\jdk-17
set SDK_DIR=%LOCALAPPDATA%\Android\Sdk
set SDK_MANAGER=%SDK_DIR%\cmdline-tools\latest\bin\sdkmanager.bat

echo Installing Android SDK Platform 34 and Build-Tools...
(
  echo y
  echo y
  echo y
  echo y
  echo y
  echo y
  echo y
) | "%SDK_MANAGER%" --sdk_root="%SDK_DIR%" "platforms;android-34" "build-tools;34.0.0"

echo Done!
