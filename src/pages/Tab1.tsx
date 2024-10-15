import {
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonLoading,
  IonPage,
  IonRow,
  IonTitle,
  IonToast,
  IonToolbar,
} from "@ionic/react";
import "./Tab1.css";
import { getProducts } from "../hooks/getProducts";
import { useEffect, useState } from "react";
import { Product } from "../interfaces/Product";
import { ProductCard } from "../components/ProductCard";

const Tab1: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<String | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      setError("Error al obtener los productos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Productos</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Productos</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonLoading isOpen={loading} message={"Cargando los productos"} />
        <IonToast
          color={"danger"}
          isOpen={error != null}
          message={`${error}`}
          duration={5000}
          position="middle"
        />
        <IonGrid>
          <IonRow>
            {products.map((product) => (
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

export default Tab1;
