/**
 * @param {number[][]} tasks
 */
var TaskManager = function (tasks) {
    this.task_user_map = new Map();
    this.task_priority_map = new Map();

    // MaxPriorityQueue: Custom comparator for priority and taskId
    // Prioritize:
    // 1. Higher priority first (b.priority - a.priority)
    // 2. Higher taskId second (b.id - a.id)
    this.pq = new MaxPriorityQueue({
        compare: (a, b) => {
            // First, compare by priority
            if (a.priority !== b.priority) {
                return a.priority - b.priority;
            }
            // If priorities are equal, compare by taskId
            return a.id - b.id;
        }
    });

    for (let [userId, taskId, priority] of tasks) {
        this.add(userId, taskId, priority);
    }
};

/** 
 * @param {number} userId 
 * @param {number} taskId 
 * @param {number} priority
 * @return {void}
 */
TaskManager.prototype.add = function (userId, taskId, priority) {
    this.task_user_map.set(taskId, userId);
    this.task_priority_map.set(taskId, priority);

    this.pq.enqueue({ id: taskId, priority: priority });
};

/** 
 * @param {number} taskId 
 * @param {number} newPriority
 * @return {void}
 */
TaskManager.prototype.edit = function (taskId, newPriority) {
    this.task_priority_map.set(taskId, newPriority);

    // The old entry in the PQ is now "invalid"
    // We add a new entry with the new priority
    this.pq.enqueue({ id: taskId, priority: newPriority });
};

/** 
 * @param {number} taskId
 * @return {void}
 */
TaskManager.prototype.rmv = function (taskId) {
    // Mark the task for lazy deletion by removing it from the maps
    this.task_user_map.delete(taskId);
    this.task_priority_map.delete(taskId);
};

/**
 * @return {number}
 */
TaskManager.prototype.execTop = function () {
    while (!this.pq.isEmpty()) {
        const { id, priority } = this.pq.dequeue();

        // Check if this is a valid, un-edited entry
        // The priority in the PQ must match the current priority in our map
        // And the task must still exist in our map
        if (this.task_priority_map.has(id) && this.task_priority_map.get(id) === priority) {
            const userId = this.task_user_map.get(id);
            // Remove the executed task from our maps
            this.task_user_map.delete(id);
            this.task_priority_map.delete(id);
            return userId;
        }
        // If the priorities don't match or the task doesn't exist, this entry is "stale"
        // Discard it and check the next one in the loop
    }
    return -1;
};

/** 
 * Your TaskManager object will be instantiated and called as such:
 * var obj = new TaskManager(tasks)
 * obj.add(userId,taskId,priority)
 * obj.edit(taskId,newPriority)
 * obj.rmv(taskId)
 * var param_4 = obj.execTop()
 */