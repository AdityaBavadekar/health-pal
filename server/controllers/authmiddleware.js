import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: "No token provided" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded){
      req.user = decoded;
      next();
    }
  } catch (error) {
    console.log(error);
    
    return res.status(401).json({ message: "Invalid token" });
  }
};

const PatientAuth = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.type === "Patient") {
      next();
    } else {
      return res.status(401).json({ message: "Patient role required For this Action" });
    }
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

const DoctorAuth = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.type === "Doctor") {
      next();
    } else {
      return res.status(401).json({ message: "Doctor role required For this Action" });
    }
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

const HospitalAuth = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.type === "Hospital") {
      next();
    } else {
      return res.status(401).json({ message: "Hospital role required For this Action" });
    }
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export { PatientAuth, DoctorAuth, HospitalAuth, authMiddleware };
