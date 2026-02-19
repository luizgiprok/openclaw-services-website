#!/bin/bash

# Script de monitoramento e reinício dos serviços OpenClaw
# Este script verifica se os serviços estão rodando e reinicia se necessário

PROJECT_DIR="/root/.openclaw/workspace/business-website/projects/website-2026-02"
SERVER_PID_FILE="$PROJECT_DIR/server.pid"
FRONTEND_PID_FILE="$PROJECT_DIR/frontend.pid"

echo "🔍 Iniciando monitoramento dos serviços OpenClaw..."

# Função para verificar e reiniciar serviço
check_and_restart() {
    local service_name=$1
    local pid_file=$2
    local start_command=$3
    local log_file=$4
    
    # Verifica se o processo está rodando
    if [ -f "$pid_file" ]; then
        local pid=$(cat "$pid_file")
        if ps -p $pid > /dev/null 2>&1; then
            echo "✅ $service_name está rodando (PID: $pid)"
            return 0
        else
            echo "⚠️  $service_name parado, tentando reiniciar..."
        fi
    else
        echo "⚠️  $service_name não encontrado, tentando iniciar..."
    fi
    
    # Mata processos órfãos
    pkill -f "$service_name" > /dev/null 2>&1
    
    # Inicia o serviço
    echo "🚀 Iniciando $service_name..."
    nohup $start_command > "$log_file" 2>&1 &
    local new_pid=$!
    echo $new_pid > "$pid_file"
    
    # Verifica se iniciou
    sleep 2
    if ps -p $new_pid > /dev/null 2>&1; then
        echo "✅ $service_name reiniciado com sucesso (PID: $new_pid)"
        return 0
    else
        echo "❌ Falha ao reiniciar $service_name"
        return 1
    fi
}

# Loop infinito de monitoramento
while true; do
    echo "🕐 Verificação em $(date)"
    
    # Monitora backend
    check_and_restart "Backend" \
        "$PROJECT_DIR/server.pid" \
        "cd $PROJECT_DIR/server && node server.js" \
        "$PROJECT_DIR/server.log"
    
    # Monitora frontend
    check_and_restart "Frontend" \
        "$PROJECT_DIR/frontend.pid" \
        "cd $PROJECT_DIR/react-app && npm run dev" \
        "$PROJECT_DIR/frontend.log"
    
    echo "⏰ Próxima verificação em 30 segundos..."
    echo "----------------------------------------"
    
    # Espera 30 segundos antes da próxima verificação
    sleep 30
done