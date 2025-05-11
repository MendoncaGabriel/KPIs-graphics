import { useRef, useEffect } from 'react';

interface DataPoint {
  oee: number;
  uptime: number;
  quality: number;
  efficiency: number;
  timestamp: number;
}

interface MetricsLineChartProps {
  currentMetrics: {
    oee: number;
    uptime: number;
    quality: number;
    efficiency: number;
  };
}

const CONFIG = {
  larguraLinha: 2,
  raioPonto: 3,
  linhasBase: 6,
  opacidadeLinhasBase: 0.2, 
  pontosMaximos: 40,
  tempoEntreAtualizacoes: 500, // ms
  suavizacao: 0.1, // entre 0 (sem suavização) e 1 (instantâneo)
};

const CORES = {
  oee: '#3b82f6',        // azul
  uptime: '#10b981',     // verde
  quality: '#ef4444',    // vermelho
  efficiency: '#eab308', // amarelo
};

export default function MetricsLineChart({ currentMetrics }: MetricsLineChartProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const historicoRef = useRef<DataPoint[]>([]);
  const suavizadoRef = useRef({
    oee: currentMetrics.oee,
    uptime: currentMetrics.uptime,
    quality: currentMetrics.quality,
    efficiency: currentMetrics.efficiency,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    const chaves = ['oee', 'uptime', 'quality', 'efficiency'] as const;
    const distanciaEntrePontos = width / CONFIG.pontosMaximos;
    let ultimaAtualizacao = Date.now();

    const adicionarNovoPonto = () => {
      historicoRef.current.push({ ...currentMetrics, timestamp: Date.now() });
      if (historicoRef.current.length > CONFIG.pontosMaximos) {
        historicoRef.current.shift(); 
      }
    };

    adicionarNovoPonto(); 

    const desenhar = () => {
      requestAnimationFrame(desenhar);

      const agora = Date.now();
      const delta = agora - ultimaAtualizacao;
      ultimaAtualizacao = agora;

      chaves.forEach((chave) => {
        suavizadoRef.current[chave] +=
          (currentMetrics[chave] - suavizadoRef.current[chave]) * CONFIG.suavizacao;
      });

      ctx.clearRect(0, 0, width, height);

      ctx.strokeStyle = `rgba(255,255,255,${CONFIG.opacidadeLinhasBase})`;
      ctx.lineWidth = 0.5;
      for (let i = 0; i <= CONFIG.linhasBase; i++) {
        const y = (i / CONFIG.linhasBase) * height;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();

        ctx.fillStyle = `rgba(255,255,255,${CONFIG.opacidadeLinhasBase})`;
        ctx.font = '12px Arial';
        const porcentagem = ((CONFIG.linhasBase - i) * 100) / CONFIG.linhasBase;
        ctx.fillText(`${Math.round(porcentagem)}%`, 10, y - 5); 
      }

      chaves.forEach((chave) => {
        const cor = CORES[chave];
        const pontos = historicoRef.current.map((d) => d[chave]);
        pontos.push(suavizadoRef.current[chave]); 

        ctx.strokeStyle = cor;
        ctx.lineWidth = CONFIG.larguraLinha;
        ctx.beginPath();

        pontos.forEach((valor, i) => {
          const x = width - (pontos.length - 1 - i) * distanciaEntrePontos;
          const y = height - (valor / 100) * height;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        });

        ctx.stroke();

        pontos.forEach((valor, i) => {
          const x = width - (pontos.length - 1 - i) * distanciaEntrePontos;
          const y = height - (valor / 100) * height;
          ctx.beginPath();
          ctx.arc(x, y, CONFIG.raioPonto, 0, 2 * Math.PI);
          ctx.fillStyle = cor;
          ctx.fill();
        });
      });

      if (delta >= CONFIG.tempoEntreAtualizacoes) {
        adicionarNovoPonto();
      }
    };

    desenhar();
  }, [currentMetrics]);

  return (
    <div className="w-full max-w-4xl p-6 bg-slate-900/30 rounded-2xl backdrop-blur-xl border border-white/20 shadow-xl mt-8">
      <div className="flex flex-wrap gap-4 mb-4 justify-center">
        {[ 
          { label: 'OEE', cor: 'bg-blue-500', texto: 'text-blue-400' },
          { label: 'Uptime', cor: 'bg-emerald-500', texto: 'text-emerald-400' },
          { label: 'Quality', cor: 'bg-red-500', texto: 'text-red-400' },
          { label: 'Efficiency', cor: 'bg-yellow-500', texto: 'text-yellow-400' },
        ].map(({ label, cor, texto }) => (
          <div key={label} className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/50">
            <div className={`w-3 h-3 rounded-full ${cor}`} />
            <span className={`text-sm font-medium ${texto}`}>{label}</span>
          </div>
        ))}
      </div>

      <div className="h-64 w-full bg-slate-950/40 rounded-xl p-2 relative">
        <canvas ref={canvasRef} width={800} height={250} className="w-full h-full" />
      </div>
    </div>
  );
}
