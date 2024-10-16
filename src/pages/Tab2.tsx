import { IonActionSheet, IonAlert, IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import './Tab2.css';
import { useFavoriteStore } from '../store/useFavoriteStore';
import { ProductCard } from '../components/ProductCard';
import { ellipsisHorizontal } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { Product } from '../interfaces/Product';
import { OverlayEventDetail } from '@ionic/react/dist/types/components/react-component-lib/interfaces';

const Tab2: React.FC = () => {

  const [localFavorites, setLocalFavorites] = useState<Product[]>([]);
  const {favorites} = useFavoriteStore();

  useEffect(() => {
    setLocalFavorites(favorites);
  }, [])

  const filter = (result: OverlayEventDetail) => {
    const sortBy = (key: keyof typeof localFavorites[0]) => {
      const sortedFavorites = [...localFavorites].sort((a, b) => {
        if (a[key] > b[key]) {
          return 1;
        } else if (a[key] < b[key]) {
          return -1;
        } else {
          return 0;
        }
      });
      setLocalFavorites(sortedFavorites);
    };
    
  
    switch (result.role) {
      case 'precio':
        sortBy('price');
        break;
      case 'nombre':
        sortBy('title');
        break;
      case 'fecha':
        sortBy('creationAt');
        break;
      default:
        break;
    }
  };
  
  

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot='primary'>
          <IonButton id='open-filter'>
            <IonIcon slot='icon-only' icon={ellipsisHorizontal}/>
          </IonButton>
          <IonActionSheet trigger='open-filter' header='Selecciona una opción' buttons={[{text: 'Filtrar por Nombre', role: 'nombre'},{text: 'Filtrar por Fecha Agregado', role: 'fecha'},{text: 'Filtrar por Precio', role: 'precio'}]} onDidDismiss={({detail}) => filter(detail)}/>
          </IonButtons>
          <IonTitle>Mis deseados</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Favoritos</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonGrid>
          <IonRow>
            <IonAlert
            isOpen={favorites.length <= 0}
            header='No tienes favoritos'
            message={'Por favor, agrega elementos a tu lista de favoritos.'}
            buttons={['Aceptar']}
            />
            {localFavorites.map((product) => (
              <IonCol key={product.id} size="12" sizeMd="4" sizeSm="6" sizeLg="3">
                <ProductCard product={product} />
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
