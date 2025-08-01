import { Button } from '@/components/shared/Button'
import { ArrowLeft, Users, AlertCircle, Plus, Edit, Trash2 } from 'lucide-react'
import { Card, CardHeader, CardContent, CardTitle } from '@/components/shared/Card'
import { Table } from '@/components/shared/Table'
export function RoleView (): React.ReactElement {
  const onBack = (): void => {}
  const roles = [
    { id: 1, name: 'Administrador', description: 'Acceso completo al sistema', isActive: true, createdAt: '2023-01-01' },
    { id: 2, name: 'Vendedor', description: 'Acceso a ventas y reportes', isActive: true, createdAt: '2023-02-01' },
    { id: 3, name: 'Cajero', description: 'Acceso a caja y transacciones', isActive: false, createdAt: '2023-03-01' }
  ]
  return (
    <div className='min-h-screen bg-[#F4F6F8]'>
      {/* Header */}
      <div className='bg-white shadow-sm border-b'>
        <div className='max-w-7xl mx-auto px-6 py-4'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center space-x-4'>
              <Button onClick={onBack} variant='ghost' className='text-[#004E64] hover:text-[#004E64]/80'>
                <ArrowLeft className='w-4 h-4 mr-2' />
                Volver
              </Button>
              <div>
                <h1 className='text-2xl font-bold text-[#2C2C2C]'>🏷️ Gestión de Roles</h1>
                <p className='text-gray-600'>Crear y administrar roles de empleados</p>
              </div>
            </div>
            <Button className='bg-[#00B179] hover:bg-[#00B179]/90'>
              <Plus className='w-4 h-4 mr-2' />
              Agregar Rol
            </Button>
            {/* <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
              </DialogTrigger>
              <DialogContent className='sm:max-w-md'>
                <DialogHeader>
                  <DialogTitle>Agregar Nuevo Rol</DialogTitle>
                </DialogHeader>
                <div className='space-y-4'>
                  <div className='space-y-2'>
                    <Label htmlFor='role-name'>Nombre del Rol *</Label>
                    <Input
                      id='role-name'
                      value={newRole.name}
                      onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
                      placeholder='ej: vendedor, cajero, supervisor'
                      className='border-2 border-gray-200 focus:border-[#004E64]'
                    />
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='role-description'>Descripción</Label>
                    <Textarea
                      id='role-description'
                      value={newRole.description}
                      onChange={(e) => setNewRole({ ...newRole, description: e.target.value })}
                      placeholder='Describe las responsabilidades de este rol...'
                      className='border-2 border-gray-200 focus:border-[#004E64]'
                      rows={3}
                    />
                  </div>
                  <div className='flex justify-end space-x-2 pt-4'>
                    <Button variant='outline' onClick={() => setIsAddDialogOpen(false)}>
                      Cancelar
                    </Button>
                    <Button
                      onClick={handleAddRole}
                      className='bg-[#00B179] hover:bg-[#00B179]/90'
                      disabled={!newRole.name.trim()}
                    >
                      Agregar
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog> */}
          </div>
        </div>
      </div>

      <div className='max-w-7xl mx-auto p-6'>
        {/* Stats */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-6'>
          <Card className='border-0 shadow-sm bg-white'>
            <CardContent className='p-6'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-sm font-medium text-gray-600'>Total Roles</p>
                  <p className='text-2xl font-bold text-[#2C2C2C]'>{roles.length}</p>
                </div>
                <div className='w-12 h-12 bg-[#004E64]/10 rounded-lg flex items-center justify-center'>
                  <Users className='w-6 h-6 text-[#004E64]' />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className='border-0 shadow-sm bg-white'>
            <CardContent className='p-6'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-sm font-medium text-gray-600'>Roles Activos</p>
                  <p className='text-2xl font-bold text-[#00B179]'>{roles.filter((role) => role.isActive).length}</p>
                </div>
                <div className='w-12 h-12 bg-[#00B179]/10 rounded-lg flex items-center justify-center'>
                  <Users className='w-6 h-6 text-[#00B179]' />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className='border-0 shadow-sm bg-white'>
            <CardContent className='p-6'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-sm font-medium text-gray-600'>Roles Inactivos</p>
                  <p className='text-2xl font-bold text-red-600'>{roles.filter((role) => !role.isActive).length}</p>
                </div>
                <div className='w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center'>
                  <AlertCircle className='w-6 h-6 text-red-600' />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Roles Table */}
        <Card className='border-0 shadow-sm bg-white'>
          <CardHeader>
            <CardTitle className='text-[#2C2C2C] text-2xl font-semibold'>Lista de Roles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='overflow-x-auto'>
              <Table
                columns={[
                  { key: 'name', element: 'Nombre' },
                  { key: 'description', element: 'Descripción' },
                  { key: 'isActive', element: 'Estado' },
                  { key: 'createdAt', element: 'Fecha Creación' },
                  { key: 'actions', element: 'Acciones' }
                ]} data={roles.map(role => (
                  {
                    name: role.name,
                    description: role.description,
                    isActive: role.isActive ? 'Activo' : 'Inactivo',
                    createdAt: role.createdAt,
                    actions: (
                      <div className='flex items-center space-x-2'>
                        <Button
                          variant='outline'
                          onClick={() => {}}
                          className='border-[#004E64] text-[#004E64] hover:bg-[#004E64] hover:text-white'
                        >
                          <Edit className='w-3 h-3 mr-1' />
                          Editar
                        </Button>
                        <Button
                          variant='outline'
                          onClick={() => {}}
                          className='border-red-200 text-red-600 hover:bg-red-50'
                        >
                          <Trash2 className='w-3 h-3 mr-1' />
                          Eliminar
                        </Button>
                      </div>
                    )
                  }
                ))}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
