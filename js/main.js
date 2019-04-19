//object.create(null) means it doesn't inherit from anything and thus has no properties at all
const DragDropManager = Object.create(null, {
  init: {
    value: () => {
      const stages = document.querySelectorAll(".stage")
      console.log("these are stages", stages) 

      stages.forEach(stage => {
        // Gain reference of item being dragged
        stage.ondragstart = e => {
          e.dataTransfer.setData("text", e.target.classList)
        }
      })

      // Added class of target to containing article so cards can be placed back inside
      const targets = document.querySelectorAll(".target")
      console.log("these are targets", targets);

      targets.forEach(target => {
        // Dragover not supported by default. Turn that off.
        target.ondragover = e => e.preventDefault()

        target.ondrop = e => {
          // Enabled dropping on targets
          e.preventDefault()

          // Determine what's being dropped
          const data = e.dataTransfer.getData("text")
          //won't appear until card is moved
          console.log("these are the data", data)

          //determines if the card is in the original grid, displays false if so
          var draggedStageOnOrigin = false;
          //won't display in grid or until moved
          console.log("Dragged Stage on Origin", draggedStageOnOrigin)
          
          //grid become the parent node for cards
          if(e.target.classList.contains('stage') && e.target.parentNode.classList.contains('grid'))
          	draggedStageOnOrigin = true;

          //if statement to prevent more than one card being in a box and to prevent nesting
          if(!e.target.classList.contains('grid') && draggedStageOnOrigin == false && e.target.hasChildNodes())
          		return;

          // Append card to target component as child
          // TODO: This should only happen if the target has no children nodes
          if(draggedStageOnOrigin)
          e.target.parentNode.appendChild(document.querySelector(`.${data.split(" ")[1]}`))
          else
          e.target.appendChild(document.querySelector(`.${data.split(" ")[1]}`))
    }
  })
}
}
})

DragDropManager.init()
