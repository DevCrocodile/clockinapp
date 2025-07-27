import { Card } from '../shared/Card'
import { CheckCircle, XCircle } from 'lucide-react'
import { useState, useEffect } from 'react'
import { Button } from '../shared/Button'

interface ConfirmationData {
  type: 'success' | 'error'
  message: string
  employeeName?: string
  time?: string
}

interface ConfirmationScreenProps {
  data: ConfirmationData | null
  onReturn: () => void
}

export function ConfirmationScreen ({ data, onReturn }: ConfirmationScreenProps): React.ReactElement {
  const [countdown, setCountdown] = useState(5)

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          onReturn()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [onReturn])

  const isSuccess = data?.type === 'success'
  const IconComponent = isSuccess ? CheckCircle : XCircle
  const bgColor = isSuccess ? 'bg-[#00B179]' : 'bg-red-500'
  const textColor = isSuccess ? 'text-[#00B179]' : 'text-red-500'

  return (
    <div className='min-h-screen flex flex-col items-center justify-center p-8 bg-[#F4F6F8]'>
      <Card className='w-full max-w-md p-8 bg-white shadow-lg border-0'>
        <div className='text-center space-y-6'>
          {/* Icon */}
          <div className={`w-20 h-20 ${bgColor} rounded-full flex items-center justify-center mx-auto`}>
            <IconComponent className='w-12 h-12 text-white' />
          </div>

          {/* Message */}
          <div className='space-y-2'>
            <h1 className={`text-2xl font-bold ${textColor}`}>{isSuccess ? '¡Registro Exitoso!' : 'Error'}</h1>
            <p className='text-[#2C2C2C] text-lg'>{data !== null ? data.message : 'No se pudo obtener el mensaje.'}</p>
            {data?.employeeName !== undefined && <p className='text-gray-600'>{data?.employeeName}</p>}
            {data?.time !== undefined && <p className='text-[#004E64] font-mono text-xl'>{data?.time}</p>}
          </div>

          {/* Countdown */}
          <div className='space-y-4'>
            <div className='text-gray-500'>Volviendo al inicio en {countdown} segundos</div>
            <div className='w-full bg-gray-200 rounded-full h-2'>
              <div
                className='bg-[#004E64] h-2 rounded-full transition-all duration-1000'
                style={{ width: `${((5 - countdown) / 5) * 100}%` }}
              />
            </div>
            <Button
              onClick={onReturn}
              variant='outline'
              className='w-full border-[#004E64] text-[#004E64] hover:bg-[#004E64] hover:text-white bg-transparent'
            >
              Volver ahora
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
