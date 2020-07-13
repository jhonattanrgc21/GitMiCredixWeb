export const menus: Menu[] = [
  {
    id: 1, name: 'Inicio', route: '/'
  },
  {
    id: 2, name: 'Componentes',
    submenus: [
      {id: 1, name: 'Botones y enlaces', icon: 'home', route: '/home/buttons-and-links'},
      {id: 2, name: 'Sliders', icon: 'home', route: '/home/sliders'},
      {id: 3, name: 'Tabla de navegación', icon: 'home', route: '/home/navigation-table'},
      {id: 4, name: 'Tablas', icon: 'home', route: '/home/tables'},
      {id: 5, name: 'Tarjetas', icon: 'home', route: '/home/cards'},
      {id: 6, name: 'Charts', icon: 'home', route: '/home/charts'},
      {id: 7, name: 'Stepper', icon: 'home', route: '/home/steppers'},
      {id: 8, name: 'Tabs', icon: 'home', route: '/home/tabs'},
      {id: 9, name: 'Switches', icon: 'home', route: '/home/switches'},
      {id: 10, name: 'Código Credix', icon: 'home', route: '/home/credix-code'},
      {id: 11, name: 'Resultados', icon: 'home', route: '/home/results'}
    ]
  },
  {id: 3, name: 'Iconos', route: '/home/icons'},
  {id: 4, name: 'Formularios', route: '/home/forms'},
  {id: 5, name: 'Alertas y mensajes', route: '/home/alerts-and-messages'},
  {id: 6, name: 'Popups', route: '/home/pop-ups'}
];

export interface Menu {
  id: number;
  name: string;
  route?: string;
  submenus?: Submenu[];
}

export interface Submenu {
  id: number;
  route: string;
  name: string;
  icon: string;
}
