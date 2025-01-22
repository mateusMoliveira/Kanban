const avatarUrls = [
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/avatar1-MZlrY88CcDdwbN6ZqpLdLQWprq4nth.png",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/avatar2-FEnd1vzhxnAt3qdioPp99Z1MNXYZe8.png",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/avatar3-C3JimozVyZcWURqbbJwExKhKQ9a142.png",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/avatar4-29IHj6NXR5zrXDGpUhS3AyXBkF8sIt.png",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/avatar5-C4bNcdfpwUXl142k3deDEQr6SLKUTC.png",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/avatar6-2JywCaCQcB5pxqaIMKDdEdokkRA6a8.png",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/avatar7-dSJBFODiairYDi9ATkwKFEzuzTNHjx.png",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/avatar8-x18x44oRJxNyvmkTrprX4YCksTHQTa.png",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/avatar9-Gi20AvAz7LQ5Am1YzpaFwZLW3AMJdp.png",
]

document.addEventListener("DOMContentLoaded", () => {
  const kanbanColumns = document.querySelectorAll(".kanban-column")

  // Drag and drop functionality
  kanbanColumns.forEach((column) => {
    const cards = column.querySelector(".kanban-cards")

    cards.addEventListener("dragover", (e) => {
      e.preventDefault()
      const afterElement = getDragAfterElement(cards, e.clientY)
      const draggable = document.querySelector(".dragging")
      if (afterElement == null) {
        cards.appendChild(draggable)
      } else {
        cards.insertBefore(draggable, afterElement)
      }
    })
  })

  document.querySelectorAll(".kanban-card").forEach((card) => {
    card.addEventListener("dragstart", () => {
      card.classList.add("dragging")
    })

    card.addEventListener("dragend", () => {
      card.classList.remove("dragging")
    })

    // Add event listener for delete button
    const deleteBtn = card.querySelector(".delete-card")
    deleteBtn.addEventListener("click", () => {
      card.remove()
    })
  })

  // Add new card functionality
  document.querySelectorAll(".add-card").forEach((button) => {
    button.addEventListener("click", () => {
      const column = button.closest(".kanban-column")
      const form = column.querySelector(".add-card-form")
      form.style.display = "block"
      button.style.display = "none"
    })
  })

  document.querySelectorAll(".cancel-add-card").forEach((button) => {
    button.addEventListener("click", () => {
      const column = button.closest(".kanban-column")
      const form = column.querySelector(".add-card-form")
      const addButton = column.querySelector(".add-card")
      form.style.display = "none"
      addButton.style.display = "block"
    })
  })

  document.querySelectorAll(".add-card-form").forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault()
      const column = form.closest(".kanban-column")
      const cards = column.querySelector(".kanban-cards")
      const title = form.querySelector('input[name="card-title"]').value
      const priority = form.querySelector('select[name="priority"]').value

      const newCard = createCard(title, priority)
      cards.appendChild(newCard)

      form.reset()
      form.style.display = "none"
      column.querySelector(".add-card").style.display = "block"
    })
  })
})

function getDragAfterElement(container, y) {
  const draggableElements = [...container.querySelectorAll(".kanban-card:not(.dragging)")]

  return draggableElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect()
      const offset = y - box.top - box.height / 2
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child }
      } else {
        return closest
      }
    },
    { offset: Number.NEGATIVE_INFINITY },
  ).element
}

function getRandomAvatar() {
  const randomIndex = Math.floor(Math.random() * avatarUrls.length)
  return avatarUrls[randomIndex]
}

function createCard(title, priority) {
  const card = document.createElement("div")
  card.className = "kanban-card"
  card.draggable = true

  card.innerHTML = `
    <div class="badge ${priority}">
      <span>${priority.charAt(0).toUpperCase() + priority.slice(1)} Priority</span>
    </div>
    <p class="card-title">${title}</p>
    <div class="card-infos">
      <div class="card-icons">
        <p><i class="fa-regular fa-comment">0</i></p>
        <p><i class="fa-solid fa-paperclip">0</i></p>
      </div>
      <div class="user">
        <img src="${getRandomAvatar()}" alt="Avatar">
      </div>
    </div>
    <button class="delete-card">
      <i class="fa-solid fa-trash"></i>
    </button>
  `

  card.addEventListener("dragstart", () => {
    card.classList.add("dragging")
  })

  card.addEventListener("dragend", () => {
    card.classList.remove("dragging")
  })

  const deleteBtn = card.querySelector(".delete-card")
  deleteBtn.addEventListener("click", () => {
    card.remove()
  })

  return card
}