import { useEffect } from "react";
import { useDispatch } from "react-redux";

export const SyncCart = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "cart") {
        try {
          const newCart = JSON.parse(event.newValue || "{}");
          dispatch({ type: "cart/replaceCart", payload: newCart }); 
        } catch (e) {
          console.error("Error sincronizando carrito", e);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [dispatch]);

  return null;
};
