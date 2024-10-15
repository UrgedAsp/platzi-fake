import { IonAlert, IonCol, IonContent, IonGrid, IonHeader, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import './Tab2.css';
import { useFavoriteStore } from '../store/useFavoriteStore';
import { ProductCard } from '../components/ProductCard';

const Tab2: React.FC = () => {

  const {favorites} = useFavoriteStore();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
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
            {favorites.map((product) => (
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
