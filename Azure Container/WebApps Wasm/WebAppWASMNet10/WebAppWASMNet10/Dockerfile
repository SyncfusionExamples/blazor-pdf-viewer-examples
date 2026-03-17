# See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

# This stage is used when running from VS in fast mode (Default for Debug configuration)
FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS base
# install System.Drawing native dependencies
RUN apt-get update && apt-get install -y --allow-unauthenticated libgdiplus libc6-dev libx11-dev
RUN ln -s libgdiplus.so gdiplus.dll

USER $APP_UID
WORKDIR /app
EXPOSE 8080
EXPOSE 8081


# This stage is used to build the service project
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
# Install Python required for WASM tools
RUN apt-get update && apt-get install -y \
        python3 \
        python3-pip \
        python3-venv \
    && ln -s /usr/bin/python3 /usr/bin/python || true
# Install WASM tools
RUN dotnet workload install wasm-tools
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["WebAppWASMNet10/WebAppWASMNet10/WebAppWASMNet10.csproj", "WebAppWASMNet10/WebAppWASMNet10/"]
COPY ["WebAppWASMNet10/WebAppWASMNet10.Client/WebAppWASMNet10.Client.csproj", "WebAppWASMNet10/WebAppWASMNet10.Client/"]
RUN dotnet restore "./WebAppWASMNet10/WebAppWASMNet10/WebAppWASMNet10.csproj"
COPY . .
WORKDIR "/src/WebAppWASMNet10/WebAppWASMNet10"
RUN dotnet build "./WebAppWASMNet10.csproj" -c $BUILD_CONFIGURATION -o /app/build

# This stage is used to publish the service project to be copied to the final stage
FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./WebAppWASMNet10.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

# This stage is used in production or when running from VS in regular mode (Default when not using the Debug configuration)
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "WebAppWASMNet10.dll"]