import { Button } from '../shared/Button'
import { ArrowLeft } from 'lucide-react'
import { Card } from '../shared/Card'
import { Input } from '../shared/Input'
import { useField } from '@/hooks/useField'

interface PinLoginScreenProps {
  onPinSubmit: (pin: string) => void
  onBack: () => void
}

export function PinLoginView ({ onPinSubmit, onBack }: PinLoginScreenProps): React.ReactElement {
  const pin = useField({ type: 'password', required: true })
  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault()
    if (pin.value.length < 4) {
      return
    }
    onPinSubmit(pin.value)
  }

  const handlePinChange = (value: string): void => {
    // Solo permitir números
    const numericValue = value.replace(/\D/g, '')
    if (numericValue.length <= 6) {
      pin.setValue(numericValue)
    }
  }
  return (
    <div className='min-h-screen flex flex-col items-center justify-center p-8 bg-[#F4F6F8]'>
      <div className='w-full max-w-md'>
        {/* Back Button */}
        <Button onClick={onBack} variant='ghost' className='mb-6 text-[#004E64] hover:text-[#004E64]/80'>
          <ArrowLeft className='w-4 h-4 mr-2' />
          Volver
        </Button>

        {/* Main Card */}
        <Card className='p-8 bg-white shadow-lg border-0'>
          <div className='text-center space-y-6'>
            <div>
              <h1 className='text-2xl font-bold text-[#2C2C2C] mb-2'>Ingresa tu PIN</h1>
              <p className='text-gray-600'>Introduce tu PIN de 4-6 dígitos</p>
            </div>

            <form onSubmit={handleSubmit} className='space-y-4'>
              <div>
                <Input
                  field={pin}
                  placeholder='••••'
                  className='text-center text-2xl tracking-widest h-16 border-2 border-gray-200 focus:border-[#004E64]'
                />
              </div>

              <Button
                onClick={() => console.log('Hola')}
                className='w-full h-12 bg-[#FF914D] hover:bg-[#FF914D]/90 text-white font-medium'
                disabled={pin.value.length < 4}
              >
                Enviar
              </Button>
            </form>

            {/* Number Pad */}
            <div className='grid grid-cols-3 gap-3 mt-6'>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                <Button
                  key={num}
                  onClick={() => handlePinChange(pin.value + num.toString())}
                  variant='outline'
                  className='h-12 text-lg font-medium border-2 border-gray-200 hover:border-[#004E64] hover:bg-[#004E64] hover:text-white'
                  disabled={pin.value.length >= 6}
                >
                  {num}
                </Button>
              ))}
              <Button
                onClick={() => { handlePinChange(pin.value.slice(0, -1)) }}
                variant='outline'
                className='h-12 text-lg font-medium border-2 border-gray-200 hover:border-red-500 hover:bg-red-500 hover:text-white'
              >
                ←
              </Button>
              <Button
                onClick={() => handlePinChange(pin.value + '0')}
                variant='outline'
                className='h-12 text-lg font-medium border-2 border-gray-200 hover:border-[#004E64] hover:bg-[#004E64] hover:text-white'
                disabled={pin.value.length >= 6}
              >
                0
              </Button>
              <Button
                onClick={() => { handlePinChange('') }}
                variant='outline'
                className='h-12 text-lg font-medium border-2 border-gray-200 hover:border-red-500 hover:bg-red-500 hover:text-white'
              >
                C
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
