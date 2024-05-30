 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
 import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";
 import { getDatabase, ref, child, get, set, update, remove } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

 // Firebase configuration
 const firebaseConfig = {
   apiKey: "AIzaSyA-vgS2CJ4oLthC_CYVR33nxesUg6QP3u0",
   authDomain: "crud-15408.firebaseapp.com",
   databaseURL: "https://crud-15408-default-rtdb.firebaseio.com",
   projectId: "crud-15408",
   storageBucket: "crud-15408.appspot.com",
   messagingSenderId: "693962555653",
   appId: "1:693962555653:web:8159d3f4dc346fcc6c776c",
   measurementId: "G-88TL5RD7RY"
 };

 // Initialize Firebase
 const app = initializeApp(firebaseConfig);
 const analytics = getAnalytics(app);
 const db = getDatabase(app);

 const items = document.getElementById('item-input');
 const itemList = document.getElementById('item-list');
 const form = document.getElementById('item-form');

 form.addEventListener('submit', async (event) => {
     event.preventDefault();
     await addItem();
 });

 // Fetch items from the database and display them
 async function fetchItems() {
     itemList.innerHTML = '';
     const snapshot = await get(child(ref(db), 'items'));
     if (snapshot.exists()) {
         const itemsData = snapshot.val();
         Object.keys(itemsData).forEach(id => {
             const item = itemsData[id];
             itemList.innerHTML += `
                 <li>${item.name}
                 <button onclick="updateItem('${id}', '${item.name}')">Edit</button>
                 <button onclick="deleteItem('${id}')">Delete</button>
                 </li>
             `;
         });
     }
 }

 // Add a new item to the database
 async function addItem() {
     const id = Date.now().toString();
     const name = items.value.trim();
     if (name) {
         await set(ref(db, 'items/' + id), { id, name });
         items.value = '';
         fetchItems();
     } else {
         alert('Item name cannot be empty!');
     }
 }

 // Update an existing item in the database
 window.updateItem = async (id, name) => {
     const newName = prompt('Enter new name', name);
     if (newName && newName.trim()) {
         await update(ref(db, 'items/' + id), { name: newName.trim() });
         fetchItems();
     }
 };

 // Delete an item from the database
 window.deleteItem = async (id) => {
     await remove(ref(db, 'items/' + id));
     fetchItems();
 };

 // Initial fetch of items
 fetchItems();