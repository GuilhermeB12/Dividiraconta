'use client'

import { useState, useEffect } from 'react'

export default function HomePage() {
  const [valorConta, setValorConta] = useState('')
  const [numPessoas, setNumPessoas] = useState('')
  const [incluirGarcom, setIncluirGarcom] = useState(false)
  const [resultado, setResultado] = useState<number | null>(null)
  const [erro, setErro] = useState('')

  useEffect(() => {
    document.title = 'Dividir Conta de Bar'
    
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Calculadora para dividir a conta de bar entre amigos')
    } else {
      const meta = document.createElement('meta')
      meta.name = 'description'
      meta.content = 'Calculadora para dividir a conta de bar entre amigos'
      document.head.appendChild(meta)
    }
  }, [])

  const calcularDivisao = () => {
    const valor = parseFloat(valorConta)
    const pessoas = parseInt(numPessoas)

    if (isNaN(valor) || isNaN(pessoas) || valor <= 0 || pessoas <= 0) {
      setErro('Preencha os campos corretamente.')
      setResultado(null)
      return
    }

    setErro('')
    const totalComTaxa = incluirGarcom ? valor * 1.1 : valor
    const valorPorPessoa = totalComTaxa / pessoas

    setResultado(Number(valorPorPessoa.toFixed(2)))
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Dividir Conta de Bar</h1>

        <label className="block mb-2">
          Valor total da conta (R$):
          <input
            type="number"
            className="w-full mt-1 p-2 border rounded"
            value={valorConta}
            onChange={(e) => setValorConta(e.target.value)}
            placeholder="Ex: 120.50"
          />
        </label>

        <label className="block mb-2">
          Número de pessoas:
          <input
            type="number"
            className="w-full mt-1 p-2 border rounded"
            value={numPessoas}
            onChange={(e) => setNumPessoas(e.target.value)}
            placeholder="Ex: 4"
          />
        </label>

        <label className="flex items-center gap-2 my-3">
          <input
            type="checkbox"
            checked={incluirGarcom}
            onChange={() => setIncluirGarcom(!incluirGarcom)}
          />
          Incluir 10% do garçom
        </label>

        <button
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
          onClick={calcularDivisao}
        >
          Calcular
        </button>

        {erro && <p className="text-red-600 mt-3">{erro}</p>}

        {resultado !== null && (
          <p className="mt-4 text-lg text-center font-semibold">
            Cada pessoa deve pagar: <br />
            <span className="text-green-600 text-2xl">R$ {resultado.toFixed(2)}</span>
          </p>
        )}
        <footer className="mt-8 text-center text-sm text-gray-500">
          Feito por{' '}
        <a
           href="https://github.com/GuilhermeB12"
           target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          GuilhermeB12
        </a>
</footer>
      </div>
    </main>
  )
}
