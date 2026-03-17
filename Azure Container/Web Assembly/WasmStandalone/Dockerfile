#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS base
# install System.Drawing native dependencies

RUN apt-get update && apt-get install -y --allow-unauthenticated libgdiplus libc6-dev libx11-dev

RUN ln -s libgdiplus.so gdiplus.dll
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
## Install Python required for WASM tools
RUN apt-get update && apt-get install -y \
        python3 \
        python3-pip \
        python3-venv \
    && ln -s /usr/bin/python3 /usr/bin/python || true
## Install WASM tools
RUN dotnet workload install wasm-tools
WORKDIR /src
COPY ["NuGet.Config","/src/"]
COPY ["package", "/src/package"]

RUN dotnet nuget add source package
COPY ["WasmStandalone.csproj", "."]
RUN apt-get update && apt-get install -y emscripten
RUN dotnet restore "WasmStandalone.csproj" --configfile "NuGet.Config"
COPY . .
RUN dotnet build "WasmStandalone.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "WasmStandalone.csproj" -c Release -o /app/publish 

FROM nginx:alpine AS final
WORKDIR /usr/share/nginx/html
COPY --from=publish /app/publish/wwwroot .
COPY nginx.conf /etc/nginx/nginx.conf