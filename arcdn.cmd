@ECHO OFF
SET cwd=%CD%
CD /d "%~dp0"
@IF EXIST "%~dp0\node.exe" (
  "%~dp0\node.exe" "%~dp0\arcdn" %*
) ELSE (
  @SETLOCAL
  @SET PATHEXT=%PATHEXT:;.JS;=;%
  node "%~dp0\arcdn" %*
  @ENDLOCAL
)
CD /d "%cwd%"