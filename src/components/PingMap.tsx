import MapView from "react-native-maps"

type Params = {
    latitude: number;
    longitude: number;
    children: React.ReactNode// TODO: Define the type of nearbySellers
}
export function PingMap({latitude, longitude, children}: Params) {
    return <MapView 
    // provider='google'
    customMapStyle={customMapStyle}
    className='flex-1 w-full' 
    initialRegion={{
      latitude,
      longitude,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
    }} 
    showsUserLocation={true}>
      
    {children}

    </MapView>
}


export const customMapStyle = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#ffffff"  
      }
    ]
  },
  {
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"  // Remove ícones
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#2E2D2D"  // Texto em cor escura (próximo ao #2E2D2D)
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#ffffff"  // Traço do texto branco
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e4e4e4"  // Estradas cinza claro
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#2E2D2D"  // Texto de estrada escuro
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#A1C6EA"  // Cor da água em amarelo claro (#f5d21f)
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e4e4e4"  // Parques em cinza claro
      }
    ]
  },
  {
    "featureType": "transit",
    "stylers": [
      {
        "visibility": "off"  // Remove elementos de trânsito para um visual mais clean
      }
    ]
  },
  {
    "featureType": "administrative",
    "stylers": [
      {
        "visibility": "off"  // Remove labels administrativas para manter minimalista
      }
    ]
  }
];
