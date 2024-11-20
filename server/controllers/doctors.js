import Doctor from '../models/Doctor.js';
function getAllDoctors(req, res) {
  Doctor.find()
    .then(doctors => {
      res.json(doctors);
    })
    .catch(err => {
      res.status(400).json(err);
    });
}

function getDoctorById(req, res) {
  const { id } = req.params;
  Doctor.findById(id)
    .then(doctor => {
      res.json(doctor);
    })
    .catch(err => {
      res.status(400).json(err);
    });
}

function addDoctor(req, res) {
  const doctor = new Doctor(req.body);
  doctor.save()
    .then(doctor => {
      res.json(doctor);
    })
    .catch(err => {
      res.status(400).json(err);
    });
}

function updateDoctor(req, res) {
  const { id } = req.params;
  Doctor.findByIdAndUpdate(
    id,
    req.body,
    { new: true, runValidators: true }
  )
    .then(doctor => {
      if (!doctor) {
        return res.status(404).json({ message: "Doctor not found" });
      }
      res.json(doctor);
    })
    .catch(err => {
      res.status(400).json(err);
    });
}

export { getDoctorById, addDoctor, updateDoctor, getAllDoctors };
