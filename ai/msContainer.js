const MemoryService = require('./memoryService');

class MemoryServiceContainer {
    constructor(name) {
        // Name of the container
        this.name = name;

        // Map to hold named MemoryService instances
        this.instances = new Map();
    }

    /**
     * Add a new MemoryService instance with a specified name.
     * @param {string} name - The name of the MemoryService instance.
     * @param {MemoryService} instance - The MemoryService instance to add.
     */
    addInstance(name, instance) {
        if (this.instances.has(name)) {
            throw new Error(`An instance with the name "${name}" already exists.`);
        }
        this.instances.set(name, instance);
    }

    /**
     * Get the name of the MemoryServiceContainer.
     * @returns {string} - The name of the MemoryServiceContainer.
     */
    getName() {
        return this.name;
    }

    /**
     * Get a MemoryService instance by its name.
     * @param {string} name - The name of the MemoryService instance.
     * @returns {MemoryService|null} - The MemoryService instance, or null if not found.
     */
    getInstance(name) {
        return this.instances.get(name) || null;
    }

    /**
     * Remove a MemoryService instance by its name.
     * @param {string} name - The name of the MemoryService instance to remove.
     * @returns {boolean} - True if the instance was removed, false if not found.
     */
    removeInstance(name) {
        return this.instances.delete(name);
    }

    /**
     * Clear all MemoryService instances.
     */
    clearInstances() {
        this.instances.clear();
    }

    /**
     * Check if a MemoryService instance exists by its name.
     * @param {string} name - The name of the MemoryService instance.
     * @returns {boolean} - True if the instance exists, false otherwise.
     */
    hasInstance(name) {
        return this.instances.has(name);
    }

    /**
     * List all names of MemoryService instances.
     * @returns {string[]} - An array of instance names.
     */
    listInstances() {
        return Array.from(this.instances.keys());
    }
}

let globalMemoryServiceContainer = new MemoryServiceContainer();

function createGlobalMemoryServiceContainer(name) {
    globalMemoryServiceContainer = new MemoryServiceContainer(name);
}

function getGlobalMemoryServiceContainer() {
    return globalMemoryServiceContainer;
}

module.exports = { getGlobalMemoryServiceContainer, createGlobalMemoryServiceContainer, MemoryServiceContainer };
