// app.js
import { db } from './firebase-config.js';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";

const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');

const itemsCollection = collection(db, 'items');

// Add Item
itemForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const itemName = itemInput.value.trim();
    if (itemName) {
        await addDoc(itemsCollection, { name: itemName });
        itemInput.value = '';
        fetchItems();
    }
});

// Fetch Items
const fetchItems = async () => {
    itemList.innerHTML = '';
    const querySnapshot = await getDocs(itemsCollection);
    querySnapshot.forEach((doc) => {
        const item = doc.data();
        const li = document.createElement('li');
        li.innerHTML = `
            ${item.name}
            <button onclick="updateItem('${doc.id}', '${item.name}')">Edit</button>
            <button onclick="deleteItem('${doc.id}')">Delete</button>
        `;
        itemList.appendChild(li);
    });
};

// Update Item
window.updateItem = async (id, name) => {
    const newName = prompt("Enter new name", name);
    if (newName) {
        const itemDoc = doc(db, 'items', id);
        await updateDoc(itemDoc, { name: newName });
        fetchItems();
    }
};

// Delete Item
window.deleteItem = async (id) => {
    const itemDoc = doc(db, 'items', id);
    await deleteDoc(itemDoc);
    fetchItems();
};

// Initial Fetch
fetchItems();
