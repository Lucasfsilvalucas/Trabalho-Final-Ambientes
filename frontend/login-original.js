import { account, databases, storage, ID, Query } from "./appwrite.js";

const databaseId = "69f90400002987f302ef";
const collectionId = "apptable";
const bucketId = "69f9086c0004cada1a9a";

export async function login(email, password) {
  try {
    await account.deleteSession("current").catch(() => {});

    await account.createEmailPasswordSession(email, password);

    const user = await account.get();

    console.log("USER LOGADO:", user);

    return user;

  } catch (error) {
    console.log("Erro no login:", error);
    return null;
  }
}

export async function getProfile(userId) {
  try {
    const response = await databases.listDocuments(
      databaseId,
      collectionId,
      [Query.equal("userId", userId)]
    );

    return response.documents.length > 0 ? response.documents[0] : null;

  } catch (error) {
    console.log("Erro ao buscar perfil:", error);
    return null;
  }
}

export function ProfilePage(profile) {
  if (!profile) return "Perfil não encontrado";

  return `
    Nome: ${profile.name}
    Email: ${profile.email}
    Foto: ${profile.imageUrl}
  `;
}

export async function updateProfile(profileId, newName) {
  try {
    await databases.updateDocument(
      databaseId,
      collectionId,
      profileId,
      {
        name: newName
      }
    );
  } catch (error) {
    console.log("Erro ao atualizar perfil:", error);
  }
}

export async function uploadImage(file, profileId) {
  try {
    const uploaded = await storage.createFile(
      bucketId,
      ID.unique(),
      file
    );

    const imageUrl = storage.getFileView(bucketId, uploaded.$id);

    await databases.updateDocument(
      databaseId,
      collectionId,
      profileId,
      {
        imageUrl
      }
    );

    return imageUrl;

  } catch (error) {
    console.log("Erro no upload:", error);
  }
}

export async function ensureProfile(user) {
  try {
    let profile = await getProfile(user.$id);

    if (!profile) {
      await databases.createDocument(
        databaseId,
        collectionId,
        ID.unique(),
        {
          userId: user.$id,
          name: user.name || "Sem nome",
          email: user.email,
          imageUrl: ""
        }
      );

      profile = await getProfile(user.$id);
    }

    return profile;

  } catch (error) {
    console.log("Erro ao garantir perfil:", error);
    return null;
  }
}

export async function logout() {
  try {
    await account.deleteSession("current");
    console.log("LOGOUT REALIZADO COM SUCESSO");
  } catch (error) {
    console.log("Erro no logout:", error);
  }
}