

class Queue {
    constructor() {
        this.items = [];
        this.count = 0;
    }

    // Add element to the rear of queue
    enqueue(element) {
        this.items[this.count] = element;
        this.count += 1;
        return element;
    }

    // Remove the front element
    dequeue() {
        if (this.isEmpty()) return undefined;

        let deletedItem = this.items.shift();
        this.count -= 1;

        return deletedItem;
    }

    // Check the front element
    peek() {
        if (this.isEmpty()) return undefined;

        return this.items[0];
    }

    // Check if queue is empty
    isEmpty() {
        return this.count === 0;
    }

    // Check queue size
    size() {
        return this.count;
    }

    // Print queue elements
    print() {
        return this.items.join(' ');
    }

    // Clear queue
    clear() {
        this.items = [];
        this.count = 0;
        return this.items;
    }
}

const queue = new Queue();

$(document).ready(function () {

    // Display all queue elements
    function displayQueue() {
        $("#queue").empty();

        queue.items.forEach(function (value) {
            let block = $("<div></div>")
                .addClass("row bg-primary enqueue")
                .text(value);

            $("#queue").append(block);
        });

        // Update front and rear labels
        if (queue.isEmpty()) {
            $("#front_value").text("Empty");
            $("#rear_value").text("Empty");
        } else {
            $("#front_value").text(queue.peek());
            $("#rear_value").text(
                queue.items[queue.count - 1]
            );
        }
    }

    // ENQUEUE BUTTON
    $("#btn_enqueue").on("click", function () {

        let value = $("#q_data").val().trim();

        if (value === "") {
            $("#message").text(
                "Please enter a value before Enqueue."
            );
            return;
        }

        queue.enqueue(value);
        displayQueue();

        $("#q_data").val("");

        $("#message").text(
            value + " added to the rear."
        );
    });

    // DEQUEUE BUTTON
    $("#btn_dequeue").on("click", function () {

        if (queue.isEmpty()) {
            $("#message").text(
                "Queue is empty! Nothing to Dequeue."
            );
            return;
        }

        let removed = queue.dequeue();

        let deletedBlock = $("<div></div>")
            .addClass(
                "row dequeue text-bg-danger border border-light"
            )
            .text(removed);

        $("#dequeued").prepend(deletedBlock);

        displayQueue();

        $("#message").text(
            removed + " removed from the front."
        );
    });

    // PEEK BUTTON
    $("#btn_peek").on("click", function () {

        if (queue.isEmpty()) {
            $("#message").text(
                "Queue is empty! Nothing to Peek."
            );
            return;
        }

        $("#queue .enqueue")
            .removeClass("peek")
            .addClass("bg-primary");

        $("#queue .enqueue")
            .first()
            .removeClass("bg-primary")
            .addClass("peek");

        $("#message").text(
            "Front value is " + queue.peek() + "."
        );
    });

    // CLEAR BUTTON
    $("#btn_clear").on("click", function () {

        queue.clear();

        displayQueue();

        $("#dequeued").empty();

        $("#message").text("Queue cleared.");
    });

    displayQueue();
});
