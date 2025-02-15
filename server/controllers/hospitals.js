import Hospital from "../models/Hospital.js";
import Doctor from "../models/Doctor.js";

function getAllHospitals(req, res) {
    Hospital.find()
        .then(hospitals => {
            res.json(hospitals);
        })
        .catch(err => {
            res.status(400).json(err);
        });
}

function getHospitalById(req, res) {
    const { id } = req.params;
    Hospital.findById(id)
        .then(hospital => {
            res.json(hospital);
        })
        .catch(err => {
            res.status(400).json(err);
        });
}

function addHospital(req, res) {
    const hospital = new Hospital(req.body);
    hospital.save()
        .then(doctor => {
            res.json(hospital);
        })
        .catch(err => {
            res.status(400).json(err);
        });
}

function updateHospital(req, res) {
    if (req.user.type != "Hospital") {
      return res.status(403).json({ message: "Forbidden" });
    }
    const { id } = req.params;
    Hospital.findByIdAndUpdate(
        id, 
        req.body,
        { new: true, runValidators: true }
    )
    .then(hospital => {
        if (!hospital) {
            return res.status(404).json({ message: "Hospital not found" });
        }
        res.json(hospital);
    })
    .catch(err => {
        res.status(400).json(err); 
    });
}

function getHospitalsByName(req, res) {
    const { name } = req.params;
    Hospital.find({ name:  { $regex: new RegExp(name, "i") } })
        .then(hospitals => {
            res.json(hospitals);
        })
        .catch(err => {
            res.status(400).json(err);
        });
}

function addDoctorToHospital(req, res) {
    if (req.user.type != "Hospital") {
      return res.status(403).json({ message: "Forbidden" });
    }
    const { doctorId } = req.body;
    const hospitalId = req.user.id;

    Hospital.findByIdAndUpdate(
        hospitalId,
        { $push: { doctorIds: doctorId } },
        { new: true, runValidators: true }
    )
    .then(hospital => {
        if (!hospital) {
            return res.status(404).json({ message: "Hospital not found" });
        }
        res.json(hospital);
    })
    .catch(err => {
        res.status(400).json(err);
    });
}

async function getDoctors(req, res){
    if (req.user.type != "Hospital") {
      return res.status(403).json({ message: "Forbidden" });
    }
    const hospitalId = req.user.id;
    try {
        const hospital = await Hospital.findById(hospitalId).populate('doctorIds')
        if (!hospital) {
            return res.status(404).json({ message: "Hospital not found" });
        }

        const doctors = [];
        for (let doctorId of hospital.doctorIds) {
            const doctor = await Doctor.findById(doctorId);
            if (doctor) {
                doctors.push(doctor);
            }
        }
        
        res.json(doctors);
    } catch (error) {
        res.status(400).json(error);
    }
}

export { getHospitalById, addHospital, updateHospital, getAllHospitals, getHospitalsByName, addDoctorToHospital, getDoctors };