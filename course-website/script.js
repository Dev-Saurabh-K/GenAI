const courses = [
    {
        id: 1,
        title: "Complete Web Development Bootcamp",
        category: "web",
        price: 49.99,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
        id: 2,
        title: "UI/UX Design Masterclass",
        category: "design",
        price: 39.99,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
        id: 3,
        title: "Digital Marketing Strategy 2023",
        category: "business",
        price: 29.99,
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
        id: 4,
        title: "Advanced JavaScript & ES6",
        category: "web",
        price: 44.99,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
        id: 5,
        title: "Graphic Design for Beginners",
        category: "design",
        price: 19.99,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1558655146-d09347e92766?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
        id: 6,
        title: "Financial Analysis & Modeling",
        category: "business",
        price: 59.99,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    }
];

let cartCount = 0;
const cartDisplay = document.getElementById('cart-count');
const courseGrid = document.getElementById('course-grid');
const filterBtns = document.querySelectorAll('.filter-btn');

function displayCourses(filteredCourses) {
    courseGrid.innerHTML = filteredCourses.map(course => `
        <div class="course-card">
            <div class="course-image">
                <img src="${course.image}" alt="${course.title}">
            </div>
            <div class="course-info">
                <span class="course-category">${course.category}</span>
                <h3>${course.title}</h3>
                <div class="course-rating">
                    ${generateStars(course.rating)}
                    <span>(${course.rating})</span>
                </div>
                <div class="course-price">
                    <span class="price">$${course.price}</span>
                    <button class="btn-add-cart" onclick="addToCart(${course.id})">Add to Cart</button>
                </div>
            </div>
        </div>
    `).join('');
}

function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let stars = '';
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    return stars;
}

function addToCart(id) {
    cartCount++;
    cartDisplay.textContent = cartCount;
    // Simple feedback
    const btn = event.target;
    const originalText = btn.textContent;
    btn.textContent = 'Added!';
    btn.style.backgroundColor = '#10b981';
    setTimeout(() => {
        btn.textContent = originalText;
        btn.style.backgroundColor = '#1e293b';
    }, 1500);
}

filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        // Remove active class
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        if (filter === 'all') {
            displayCourses(courses);
        } else {
            const filtered = courses.filter(c => c.category === filter);
            displayCourses(filtered);
        }
    });
});

// Initial display
displayCourses(courses);
