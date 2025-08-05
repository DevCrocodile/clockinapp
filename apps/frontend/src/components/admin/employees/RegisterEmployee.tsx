import { Button } from '@/components/shared/Button'
import { ArrowLeft, UserPlus, Building, Clock, Key, Fingerprint, Coffee } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/shared/Card'
import { useState } from 'react'
import { Input } from '@/components/shared/Input'
import type { Branch, Role } from '@/types'
import { useField } from '@/hooks/useField'
import { Select } from '@/components/shared/Select'
import { useSelect } from '@/hooks/useSelect'

interface RegisterEmployeeProps {
  roles: Role[]
  branches: Branch[]
  onBack: () => void
  onSave: () => void
}
export function RegisterEmployee ({ roles, branches, onBack, onSave }: RegisterEmployeeProps): React.ReactElement {
  const employeeNameField = useField({ type: 'text', required: true })
  const phoneField = useField({ type: 'tel', required: true })
  const roleSelect = useSelect({ required: true })
  const branchSelect = useSelect({ required: true, defaultValue: 'La Paz' })
  const clockInField = useField({ type: 'time', required: true })
  const clockOutField = useField({ type: 'time', required: true })
  const lunchStartField = useField({ type: 'time' })
  const lunchEndField = useField({ type: 'time' })
  const morningClockInField = useField({ type: 'time' })
  const morningClockOutField = useField({ type: 'time' })
  const afternoonClockInField = useField({ type: 'time' })
  const afternoonClockOutField = useField({ type: 'time' })
  const pinField = useField({ type: 'password', required: true })
  const splitScheduleField = useField({ type: 'checkbox' })
  const lunchBreakField = useField({ type: 'checkbox' })

  const [formData, setFormData] = useState({
    name: employeeNameField.value,
    phone: phoneField.value,
    role: roleSelect.value,
    branch: branchSelect.value,
    startTime: clockInField.value,
    endTime: clockOutField.value,
    expectedHours: 8,
    pin: pinField.value,
    authMethods: {
      pin: false,
      fingerprint: false
    },
    hasLunchBreak: lunchBreakField.value,
    lunchStart: lunchStartField.value,
    lunchEnd: lunchEndField.value,
    hasSplitSchedule: splitScheduleField.value,
    morningEnd: morningClockOutField.value,
    afternoonStart: afternoonClockInField.value,
    workDays: {
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: false,
      sunday: false
    }
  })

  // Remover estas líneas:
  // const roles = ["secretaria", "repartidor", "contador", "gerente", "vendedor"]
  // const branches = ["La Paz", "Santa Cruz", "Cochabamba", "Sucre"]

  // Y usar los datos que vienen de props filtrados por activos
  const activeRoles = roles.filter((role) => role.isActive)
  const activeBranches = branches.filter((branch) => branch.isActive)

  const dayLabels = {
    monday: 'Lunes',
    tuesday: 'Martes',
    wednesday: 'Miércoles',
    thursday: 'Jueves',
    friday: 'Viernes',
    saturday: 'Sábado',
    sunday: 'Domingo'
  }

  //   const handleInputChange = (field: string, value: string | number | boolean): void => {
  //     setFormData((prev) => ({
  //       ...prev,
  //       [field]: value
  //     }))
  //   }

  //   const handleAuthMethodChange = (method: 'pin' | 'fingerprint', checked: boolean): void => {
  //     setFormData((prev) => ({
  //       ...prev,
  //       authMethods: {
  //         ...prev.authMethods,
  //         [method]: checked
  //       }
  //     }))
  //   }

  const handleWorkDayToggle = (day: keyof typeof formData.workDays): void => {
    setFormData((prev) => ({
      ...prev,
      workDays: {
        ...prev.workDays,
        [day]: !prev.workDays[day]
      }
    }))
  }

  const calculateHours = (): number => {
    if (formData.hasSplitSchedule !== '') {
      // Calcular horas para horario quebrado
      const morningStart = new Date(`2000-01-01T${formData.startTime}:00`)
      const morningEnd = new Date(`2000-01-01T${formData.morningEnd}:00`)
      const afternoonStart = new Date(`2000-01-01T${formData.afternoonStart}:00`)
      const afternoonEnd = new Date(`2000-01-01T${formData.endTime}:00`)

      const morningHours = (morningEnd.getTime() - morningStart.getTime()) / (1000 * 60 * 60)
      const afternoonHours = (afternoonEnd.getTime() - afternoonStart.getTime()) / (1000 * 60 * 60)

      return Math.max(0, Math.round(morningHours + afternoonHours))
    } else {
      // Calcular horas normales
      const start = new Date(`2000-01-01T${formData.startTime}:00`)
      const end = new Date(`2000-01-01T${formData.endTime}:00`)
      let totalHours = (end.getTime() - start.getTime()) / (1000 * 60 * 60)

      // Restar tiempo de comida si aplica
      if (formData.hasLunchBreak !== '') {
        const lunchStart = new Date(`2000-01-01T${formData.lunchStart}:00`)
        const lunchEnd = new Date(`2000-01-01T${formData.lunchEnd}:00`)
        const lunchHours = (lunchEnd.getTime() - lunchStart.getTime()) / (1000 * 60 * 60)
        totalHours -= lunchHours
      }

      return Math.max(0, Math.round(totalHours * 10) / 10) // Redondear a 1 decimal
    }
  }

  const getWorkingDaysCount = (): number => {
    return Object.values(formData.workDays).filter(Boolean).length
  }

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault()
    // Simular guardado
    console.log('Guardando empleado:', formData)
    onSave()
  }

  return (
    <div className='min-h-screen bg-[#F4F6F8]'>
      {/* Header */}
      <div className='bg-white shadow-sm border-b'>
        <div className='max-w-7xl mx-auto px-6 py-4'>
          <div className='flex items-center space-x-4'>
            <Button onClick={onBack} variant='ghost' className='text-[#004E64] hover:text-[#004E64]/80'>
              <ArrowLeft className='w-4 h-4 mr-2' />
              Volver
            </Button>
            <div>
              <h1 className='text-2xl font-bold text-[#2C2C2C]'>➕ Registrar Nuevo Empleado</h1>
              <p className='text-gray-600'>Completa la información del empleado</p>
            </div>
          </div>
        </div>
      </div>

      <div className='max-w-4xl mx-auto p-6'>
        <form onSubmit={handleSubmit} className='space-y-6'>
          {/* Personal Information */}
          <Card className='border-0 shadow-sm bg-white'>
            <CardHeader>
              <CardTitle className='text-[#2C2C2C] flex items-center text-2xl font-semibold'>
                <UserPlus className='w-5 h-5 mr-2' />
                Información Personal
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div className='space-y-2'>
                  <Input
                    field={employeeNameField}
                    placeholder='Juan Pérez López'
                    className='border-2 border-gray-200 focus:border-[#004E64]'
                    label='Nombre Completo *'
                  />
                </div>

                <div className='space-y-2'>
                  <Input
                    field={phoneField}
                    placeholder='+591 70123456'
                    className='border-2 border-gray-200 focus:border-[#004E64]'
                    label='Número de Celular *'
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Work Information */}
          <Card className='border-0 shadow-sm bg-white'>
            <CardHeader>
              <CardTitle className='text-[#2C2C2C] flex items-center text-2xl font-semibold'>
                <Building className='w-5 h-5 mr-2' />
                Información Laboral
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div className='space-y-2'>
                  <Select label='Rol *' field={roleSelect} options={activeRoles.map(role => ({ value: role.id, label: role.name.charAt(0).toUpperCase() + role.name.slice(1) }))} />
                </div>
                <div className='space-y-2'>
                  <Select label='Sucursal Asignada *' field={branchSelect} options={activeBranches.map(branch => ({ value: branch.id, label: branch.name.charAt(0).toUpperCase() + branch.name.slice(1) }))} />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Schedule and Work Days Combined */}
          <Card className='border-0 shadow-sm bg-white'>
            <CardHeader>
              <CardTitle className='text-[#2C2C2C] flex items-center text-2xl font-semibold'>
                <Clock className='w-5 h-5 mr-2' />
                Horario y Días de Trabajo
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-6'>
              {/* Split Schedule Option */}
              <div className='space-y-4'>
                <div className='flex items-center space-x-3'>
                  <Input field={splitScheduleField} />
                  <p className='flex items-center space-x-2 cursor-pointer'>
                    <Clock className='w-4 h-4 text-[#FF914D]' />
                    <span className='font-medium'>Horario Quebrado (mañana y tarde)</span>
                  </p>
                </div>
                {formData.hasSplitSchedule !== ''
                  ? (
                    <div className='ml-6 space-y-4'>
                      <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                        <div className='space-y-2'>
                          <Input
                            field={morningClockInField}
                            className='border-2 border-gray-200 focus:border-[#004E64]'
                            label='Entrada Mañana'
                            placeholder='08:00'
                          />
                        </div>
                        <div className='space-y-2'>
                          <Input
                            field={morningClockOutField}
                            className='border-2 border-gray-200 focus:border-[#004E64]'
                            placeholder='12:00'
                            label='Salida Mañana'
                          />
                        </div>
                        <div className='space-y-2'>
                          <Input
                            field={afternoonClockInField}
                            label='Entrada Tarde'
                            placeholder='14:00'
                            className='border-2 border-gray-200 focus:border-[#004E64]'
                          />
                        </div>
                        <div className='space-y-2'>
                          <Input
                            field={afternoonClockOutField}
                            placeholder='18:00'
                            label='Salida Tarde'
                            className='border-2 border-gray-200 focus:border-[#004E64]'
                          />
                        </div>
                      </div>
                    </div>
                    )
                  : (

                    <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                      <div className='space-y-2'>
                        <Input
                          field={clockInField}
                          label='Hora de Entrada'
                          className='border-2 border-gray-200 focus:border-[#004E64]'
                          placeholder='08:00'
                        />
                      </div>

                      <div className='space-y-2'>
                        <Input
                          field={clockOutField}
                          className='border-2 border-gray-200 focus:border-[#004E64]'
                          label='Hora de Salida'
                          placeholder='17:00'
                        />
                      </div>

                      <div className='space-y-1'>
                        <p className='text-[#2C2C2C] text-sm font-semibold'>Horas por Día</p>
                        <div className='h-10 px-3 py-2 border-2 border-gray-200 rounded-md bg-gray-50 flex items-center'>
                          <span className='text-[#004E64] font-medium'>{calculateHours()} horas</span>
                        </div>
                      </div>
                    </div>
                    )}
              </div>

              {/* Lunch Break Option */}
              {formData.hasSplitSchedule === '' && (
                <div className='space-y-4'>
                  <div className='flex items-center space-x-3'>
                    <Input field={lunchBreakField} />
                    <p className='flex items-center space-x-2 cursor-pointer'>
                      <Coffee className='w-4 h-4 text-[#00B179]' />
                      <span className='font-medium'>Hora de Comida</span>
                    </p>
                  </div>

                  {formData.hasLunchBreak !== '' && (
                    <div className='ml-6 grid grid-cols-2 gap-4'>
                      <div className='space-y-2'>
                        <Input
                          field={lunchStartField}
                          className='border-2 border-gray-200 focus:border-[#004E64]'
                          label='Inicio Comida'
                          placeholder='12:00'
                        />
                      </div>
                      <div className='space-y-2'>
                        <Input
                          field={lunchEndField}
                          placeholder='13:00'
                          label='Fin Comida'
                          className='border-2 border-gray-200 focus:border-[#004E64]'
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Interactive Weekly Schedule */}
              <div className='bg-[#004E64]/5 p-4 rounded-lg'>
                <div className='flex items-center justify-between mb-3'>
                  <p className='text-sm text-[#004E64] font-medium'>📅 Selecciona los días de trabajo</p>
                  <p className='text-xs text-gray-600'>Haz clic en los días para activar/desactivar</p>
                </div>
                <div className='grid grid-cols-7 gap-2 text-xs mb-3'>
                  {Object.entries(dayLabels).map(([key, dayLabel]) => {
                    const isWorkDay = formData.workDays[key as keyof typeof formData.workDays]
                    return (
                      <div key={key} className='text-center'>
                        <div className='font-medium text-gray-600 mb-1'>{dayLabel.slice(0, 3)}</div>
                        <div
                          onClick={() => handleWorkDayToggle(key as keyof typeof formData.workDays)}
                          className={`h-12 rounded text-xs p-1 flex flex-col items-center justify-center cursor-pointer transition-all duration-200 border-2 ${
                            isWorkDay
                              ? 'bg-[#00B179] text-white border-[#00B179] hover:bg-[#00B179]/90 shadow-sm'
                              : 'bg-gray-200 text-gray-500 border-gray-300 hover:bg-gray-300 hover:border-gray-400'
                          }`}
                        >
                          {isWorkDay
                            ? (
                              <>
                                <div className='font-medium'>{calculateHours()}h</div>
                                {formData.hasSplitSchedule !== ''
                                  ? (
                                    <div className='text-xs opacity-90'>Quebrado</div>
                                    )
                                  : formData.hasLunchBreak !== ''
                                    ? (
                                      <div className='text-xs opacity-90'>+Comida</div>
                                      )
                                    : (
                                      <div className='text-xs opacity-90'>Continuo</div>
                                      )}
                              </>
                              )
                            : (
                              <div className='text-xs'>
                                <div>Descanso</div>
                                <div className='text-xs opacity-75'>Click para</div>
                                <div className='text-xs opacity-75'>activar</div>
                              </div>
                              )}
                        </div>
                      </div>
                    )
                  })}
                </div>
                <div className='flex justify-between items-center text-xs text-gray-600'>
                  <div>
                    <strong>Días seleccionados:</strong> {getWorkingDaysCount()} días por semana
                  </div>
                  <div>
                    <strong>Total semanal:</strong> {calculateHours() * getWorkingDaysCount()} horas
                  </div>
                </div>
                {getWorkingDaysCount() === 0 && (
                  <div className='mt-2 text-xs text-red-600 bg-red-50 p-2 rounded'>
                    ⚠️ Debes seleccionar al menos un día de trabajo
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Authentication Methods */}
          <Card className='border-0 shadow-sm bg-white'>
            <CardHeader>
              <CardTitle className='text-[#2C2C2C] flex items-center text-2xl font-semibold'>
                <Key className='w-5 h-5 mr-2' />
                Métodos de Autenticación
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='space-y-4'>
                <div className='flex items-center space-x-3'>
                  {/* <Checkbox
                    id='pin-auth'
                    checked={formData.authMethods.pin}
                    onCheckedChange={(checked) => handleAuthMethodChange('pin', checked as boolean)}
                  />
                  <Label htmlFor='pin-auth' className='flex items-center space-x-2 cursor-pointer'>
                    <Key className='w-4 h-4 text-[#004E64]' />
                    <span>PIN (4-6 dígitos)</span>
                  </Label> */}
                </div>

                {formData.authMethods.pin && (
                  <div className='ml-6 space-y-2'>
                    <Input
                      field={pinField}
                      placeholder='1234'
                      label='PIN del Empleado'
                      className='w-32 border-2 border-gray-200 focus:border-[#004E64]'
                    />
                  </div>
                )}

                <div className='flex items-center space-x-3'>
                  {/* <Checkbox
                    id='fingerprint-auth'
                    checked={formData.authMethods.fingerprint}
                    onCheckedChange={(checked) => handleAuthMethodChange('fingerprint', checked as boolean)}
                  />
                  <Label htmlFor='fingerprint-auth' className='flex items-center space-x-2 cursor-pointer'>
                    <Fingerprint className='w-4 h-4 text-[#FF914D]' />
                    <span>Huella Digital (simulada)</span>
                  </Label> */}
                </div>

                {formData.authMethods.fingerprint && (
                  <div className='ml-6'>
                    <Button
                      type='button'
                      variant='outline'
                      className='border-[#FF914D] text-[#FF914D] hover:bg-[#FF914D] hover:text-white bg-transparent'
                    >
                      <Fingerprint className='w-4 h-4 mr-2' />
                      Registrar Huella (Simulado)
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className='flex justify-end space-x-4'>
            <Button
              type='button'
              variant='outline'
              onClick={onBack}
              className='border-gray-300 text-gray-600 hover:bg-gray-50 bg-transparent'
            >
              Cancelar
            </Button>
            <Button
              type='submit'
              className='bg-[#00B179] hover:bg-[#00B179]/90'
              disabled={formData.name !== '' || formData.phone !== '' || formData.role !== '' || getWorkingDaysCount() === 0}
            >
              <UserPlus className='w-4 h-4 mr-2' />
              Registrar Empleado
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
