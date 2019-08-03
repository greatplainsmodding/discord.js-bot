// Structure to use on commands.
class Command {
    constructor() {
        this.name = null;
        this.category = null;
    }

    get description() {
        throw new Error('Must be extended to be used.');
    }

    get usage() {
        throw new Error('Must be extended to be used.');
    }

    get perms() {
        return false; // Refer to https://discord.js.org/#/docs/main/master/class/Permissions?scrollTo=s-FLAGS can be also an array of that.
    }

    get cooldown() {
        return 0; // In seconds
    }

    async run() {
        throw new Error('Must be extended to be used.');
    }
}
module.exports = Command;