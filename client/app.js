const API_URL = 'https://localhost:5003/api/events';
        const form = document.getElementById('eventForm');
        const eventsContainer = document.getElementById('eventsContainer');
        let editingId = null;

        // Load events on page load
        window.addEventListener('load', loadEvents);

        async function loadEvents() {
            try {
                const response = await fetch(API_URL);
                const events = await response.json();
                displayEvents(events);
            } catch (error) {
                console.error('Error loading events:', error);
            }
        }

        function displayEvents(events) {
            eventsContainer.innerHTML = '';
            events.forEach(event => {
                const eventElement = document.createElement('div');
                eventElement.className = 'event-card';
                eventElement.innerHTML = `
                    <div>
                        <h3>${event.name}</h3>
                        <p>Location: ${event.location}</p>
                        <p>Date: ${new Date(event.date).toLocaleString()}</p>
                    </div>
                    <div class="event-actions">
                        <button onclick="editEvent(${event.id})">Edit</button>
                        <button class="delete-btn" onclick="deleteEvent(${event.id})">Delete</button>
                    </div>
                `;
                eventsContainer.appendChild(eventElement);
            });
        }

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const eventData = {
                name: document.getElementById('eventName').value,
                location: document.getElementById('eventLocation').value,
                date: document.getElementById('eventDate').value
            };

            try {
                if (editingId) {
                    await fetch(`${API_URL}/${editingId}`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ ...eventData, id: editingId })
                    });
                    editingId = null;
                } else {
                    await fetch(API_URL, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(eventData)
                    });
                }

                form.reset();
                loadEvents();
                document.getElementById('submitBtn').textContent = 'Add Event';
            } catch (error) {
                console.error('Error saving event:', error);
            }
        });

        async function editEvent(id) {
            try {
                const response = await fetch(`${API_URL}/${id}`);
                const event = await response.json();
                
                document.getElementById('eventName').value = event.name;
                document.getElementById('eventLocation').value = event.location;
                document.getElementById('eventDate').value = new Date(event.date).toISOString().slice(0,16);
                document.getElementById('submitBtn').textContent = 'Update Event';
                editingId = id;
            } catch (error) {
                console.error('Error editing event:', error);
            }
        }

        async function deleteEvent(id) {
            if (confirm('Are you sure you want to delete this event?')) {
                try {
                    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
                    loadEvents();
                } catch (error) {
                    console.error('Error deleting event:', error);
                }
            }
        }