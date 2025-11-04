import { onCall } from "firebase-functions/v2/https";
import { initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

initializeApp();

/* elimina un documento por id en la coleccion indicada */
export const eliminarPorId = onCall(async (req) => {
  const datos = req.data as { coleccion?: string; id?: string };

  const coleccion = (datos?.coleccion || "").toString().trim();
  const id = (datos?.id || "").toString().trim();

  if (!coleccion || !id) {
    throw new Error("faltan coleccion o id");
  }

  await getFirestore().collection(coleccion).doc(id).delete();

  return { ok: true };
});
