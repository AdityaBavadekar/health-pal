import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Doctor from '../models/Doctor.js';
import Patient from "../models/Patient.js";
import Hospital from "../models/Hospital.js";

function PatientRegister(req, res) {
  const { name, email, mobileNumber, country, provience, city, address, password, dob, gender, weight, bloodSign, familyDoctor, emergencyNumber, diseases, operations, alergies } = req.body;
  if (!name || !email || !password || !dob || !gender || !mobileNumber) {
    return res.status(400).json({ message: "Please provide all the fields" });
  }
  Patient.findOne({ email })
    .then(user => {
      if (user) {
        return res.status(400).json({ message: `Paitient with email ${email} already exists` });
      }
      bcrypt.hash(password, 10)
        .then(hashedPassword => {
          const newPatient = new Patient({
            name,
            email,
            password: hashedPassword,
            dob,
            gender,
            country,
            provience,
            city,
            address,
            mobileNumber,
            weight,
            bloodSign,
            familyDoctor,
            emergencyNumber,
            diseases,
            operations,
            alergies
          });

          newPatient.save()
            .then(user => {
              const token = jwt.sign({ id: user._id, type: "Patient" }, process.env.JWT_SECRET);
              // TODO: change this to use the user id
              res.json({ token });
            })
            .catch(err => {
              res.status(400).json(err);
            });
        })
        .catch(err => {
          res.status(400).json(err);
        });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
}
function PatientLogin(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Please provide email and password" });
  }
  Patient.findOne({ email })
    .then(user => {
      if (!user) {
        return res.status(400).json({ message: "Patient not found" });
      }
      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (!isMatch) {
            return res.status(400).json({ message: "Invalid password" });
          }
          const token = jwt.sign({ id: user._id, type: "Patient" }, process.env.JWT_SECRET);
          res.json({ token });
        })
        .catch(err => {
          res.status(400).json(err);
        });
    })
    .catch(err => {
      res.status(400).json(err);
    });
}
function DoctorRegister(req, res) {
  const { name, email, mobileNumber, address, password, dob, gender, degree, specialization, experience, licenseData } = req.body;
  if (!name, !email || !mobileNumber || !address || !password || !dob || !gender || !degree || !specialization || !experience || !licenseData) {
    return res.status(400).json({ message: "Please provide all the fields" });
  }
  Doctor.findOne({ email })
    .then(user => {
      if (user) {
        return res.status(400).json({ message: `Doctor with email ${email} already exists` });
      }
      bcrypt.hash(password, 10)
        .then(hashedPassword => {
          const newDoctor = new Doctor({
            name,
            email,
            password: hashedPassword,
            dob,
            gender,
            address,
            mobileNumber,
            degree,
            specialization,
            experience,
            licenseData
          });

          newDoctor.save()
            .then(user => {
              const token = jwt.sign({ id: user._id, type: "Doctor" }, process.env.JWT_SECRET);
              // TODO: change this to use the user id
              res.json({ token });
            })
            .catch(err => {
              res.status(400).json(err);
            });
        })
        .catch(err => {
          res.status(400).json(err);
        });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
}

function DoctorLogin(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Please provide email and password" });
  }
  Doctor.findOne({ email })
    .then(user => {
      if (!user) {
        return res.status(400).json({ message: `Doctor with email ${email} not found` });
      }
      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (!isMatch) {
            return res.status(400).json({ message: "Invalid password" });
          }
          const token = jwt.sign({
            id: user._id,
            type: "Doctor"
          }, process.env.JWT_SECRET);
          res.json({ token });
        })
        .catch(err => {
          res.status(400).json(err);
        });
    })
    .catch(err => {
      res.status(400).json(err);
    });
}

function HospitalRegister(req, res) {
  const { name, email, address, mobileNumber, licenseData, password, doctorIds } = req.body;
  if (!name || !email || !address || !mobileNumber || !licenseData || !password) {
    return res.status(400).json({ message: "Please provide all the fields" });
  }
  Hospital.findOne({ email })
    .then(user => {
      if (user) {
        return res.status(400).json({ message: `Hospital with email ${email} already exists` });
      }
      bcrypt.hash(password, 10)
        .then(hashedPassword => {
          const newHospital = new Hospital({
            name,
            email,
            password: hashedPassword,
            address,
            mobileNumber,
            licenseData,
            doctorIds
          });

          newHospital.save()
            .then(user => {
              const token = jwt.sign({ id: user._id, type: "Hospital" }, process.env.JWT_SECRET);
              // TODO: change this to use the user id
              res.json({ token });
            })
            .catch(err => {
              res.status(400).json(err);
            });
        })
        .catch(err => {
          res.status(400).json(err);
        });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
}
function HospitalLogin(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Please provide email and password" });
  }
  Hospital.findOne({ email })
    .then(user => {
      if (!user) {
        return res.status(400).json({ message: " Hospital not found" });
      }
      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (!isMatch) {
            return res.status(400).json({ message: "Invalid password" });
          }
          const token = jwt.sign({ id: user._id, type: "Hospital" }, process.env.JWT_SECRET);
          res.json({ token });
        })
        .catch(err => {
          res.status(400).json(err);
        });
    })
    .catch(err => {
      res.status(400).json(err);
    });
}
export { PatientRegister, PatientLogin, DoctorRegister, DoctorLogin, HospitalRegister, HospitalLogin };

