import User from "../models/userDB.js";

export async function fetchUsers(req, res) {
  try {
    const users = await User.find();
    return res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function fetchAdmins(req, res) {
  try {
    const users = await User.find();
    const admins = await users.filter((user) => user.role === "admin");
    if (admins.length < 1) {
      return res.status(404).json({ message: "No admins found" });
    } else {
      return res.json(admins);
    }
  } catch (error) {
    console.error("Error fetching admins:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function fetchMembers(req, res) {
  try {
    const users = await User.find();
    const members = await users.filter((user) => user.role === "member");
    if (members.length < 1) {
      return res.status(404).json({ message: "No members found" });
    } else {
      return res.json(members);
    }
  } catch (error) {
    console.error("Error fetching members:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function createUser(req, res) {
  try {
    let { newUser } = req.body;
    let userId = 1;
    if (!newUser) {
      return res.status(400).json({ message: "New user data not sent" });
    }

    const { firstName, lastName, email, password } = newUser;

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    } 
    else if (!email.includes("@") || !email.includes(".")) {
      return res.status(400).json({ message: "Invalid email format" });
    } 
    else {
      const users = await User.find();
      const existingUser = await users.some(user => user.email === email);
      if(existingUser){
        return res.status(400).json({ message: "Email already exists" });
      }
      userId = users.length + 1;
      newUser.userId = userId;
      newUser.role = "member";
      newUser.status = true;
      const user = new User(newUser);
      await user.save();
      return res.json({ user, message: "User created successfully" });
    }
  } catch (error) {
    console.error("Error adding user:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function updateUser(req, res) {
  try {
    const { updatedUser } = req.body;
    if (!updatedUser) {
      return res.status(400).json({ message: "Updated User Not Sent" });
    }

    const { userId, firstName, lastName, email, password, role } = updatedUser;
    if ( !userId || !firstName || !lastName || !email || !password || !role ) {
      return res.status(400).json({ message: "All fields are required" });
    } 
    else if (!email.includes("@") || !email.includes(".")) {
      return res.status(400).json({ message: "Invalid email format" });
    }
    const user = await User.findOne({ userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.firstName = updatedUser.firstName;
    user.lastName = updatedUser.lastName;
    await user.save();
    return res.json({ user, message: "User updated successfully" });
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function deleteUser(req, res) {
  try {
    const { removeUser } = req.body;
    if (!removeUser) {
      return res.status(400).json({ message: "Remove User Not Sent" });
    }

    const removed = await User.findOneAndDelete({ userId: removeUser.userId });
    if (!removed) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function setLogIn(req, res) {
  try {
    const { loggedUser } = req.body;
    if (!loggedUser) {
      return res.status(400).json({ message: "User Not Sent" });
    }
    const user = await User.findOne({ userId: loggedUser.userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.status = true;
    await user.save();
    return res.json({ message: "User logged in successfully" });
  } catch (error) {
    console.error("Error setting logged in:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function setLogout(req, res) {
  try {
    const { loggedUser } = req.body;
    if (!loggedUser) {
      return res.status(400).json({ message: "User Not Sent" });
    }
    const user = await User.findOne({ userId: loggedUser.userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.status = false;
    await user.save();
    return res.json({ message: "User logged out successfully" });
  } catch (error) {
    console.error("Error setting logged out:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
