interface IAppointment {
  create(
    patient: string,
    medic: string,
    specialty: string,
    subSpecialty: string,
    scheduleDate: string,
    medicCenter: string,
    insurance: string
  ): string;
}

class AppointmentPeru implements IAppointment {
  create(
    patient: string,
    medic: string,
    specialty: string,
    subSpecialty: string,
    scheduleDate: string,
    medicCenter: string,
    insurance: string
  ): string {
    this.schedule(
      patient,
      medic,
      specialty,
      subSpecialty,
      scheduleDate,
      medicCenter
    );
    this.addInsurance(insurance);
    return this.check();
  }

  schedule(
    patient: string,
    medic: string,
    specialty: string,
    subSpecialty: string,
    scheduleDate: string,
    medicCenter: string
  ) {}

  addInsurance(insurance: string) {}

  check(): string {
    return "appointment scheduled in Perú";
  }
}

class AppointmentColombia implements IAppointment {
  create(
    patient: string,
    medic: string,
    specialty: string,
    subSpecialty: string,
    scheduleDate: string,
    medicCenter: string,
    insurance: string
  ): string {
    this.attachInsurance(insurance, medicCenter, specialty, subSpecialty);
    this.schedule(patient, medic, scheduleDate);
    return this.checkAvailability();
  }
  attachInsurance(
    insurance: string,
    medicCenter: string,
    specialty: string,
    subSpecialty: string
  ) {}

  schedule(patient: string, medic: string, scheduleDate: string) {}

  checkAvailability() {
    return "appointment scheduled in Colombia";
  }
}

class AppointmentChile implements IAppointment {
  create(
    patient: string,
    medic: string,
    specialty: string,
    subSpecialty: string,
    scheduleDate: string,
    medicCenter: string,
    insurance: string
  ): string {
    this.validateInsurance(insurance, patient);
    this.validateBeneficsPlan(insurance, specialty, subSpecialty);
    return this.processAppointment(
      patient,
      medic,
      specialty,
      subSpecialty,
      scheduleDate,
      medicCenter,
      insurance
    );
  }

  validateInsurance(insurance: string, patient: string) {}

  validateBeneficsPlan(
    insurance: string,
    specialty: string,
    subSpecialty: string
  ) {}

  processAppointment(
    patient: string,
    medic: string,
    specialty: string,
    subSpecialty: string,
    scheduleDate: string,
    medicCenter: string,
    insurance: string
  ) {
    return "appointment scheduled in Chile";
  }
}

class Appointment {
  patient: string;
  medic: string;
  specialty: string;
  subSpecialty: string;
  scheduleDate: string;
  medicCenter: string;
  insurance: string;
  countryISO: string;

  constructor(
    patient: string,
    medic: string,
    specialty: string,
    subSpecialty: string,
    scheduleDate: string,
    medicCenter: string,
    insurance: string,
    countryISO: string
  ) {
    this.patient = patient;
    this.medic = medic;
    this.specialty = specialty;
    (this.subSpecialty = subSpecialty),
      (this.scheduleDate = "2024-22-07T15:00:00Z");
    this.medicCenter = medicCenter;
    this.insurance = insurance;
    this.countryISO = countryISO;
  }

  makeAppointment() {
    const instance: IAppointment =
      this.countryISO === "PE"
        ? new AppointmentPeru()
        : this.countryISO === "CO"
        ? new AppointmentColombia()
        : new AppointmentChile();
    return instance.create(
      this.patient,
      this.medic,
      this.specialty,
      this.subSpecialty,
      this.scheduleDate,
      this.medicCenter,
      this.insurance
    );

    /*if (this.countryISO === "PE") {
            const instance = new AppointmentPeru()
            instance.schedule(this.patient, this.medic, this.specialty, this.subSpecialty, this.scheduleDate, this.medicCenter)
            instance.addInsurance(this.insurance)
            const check = instance.check()
            console.log(check ? "appointment done" : "appointment rejected")
        } else if (this.countryISO === "CO") {
            const instance = new AppointmentColombia()
            instance.attachInsurance(this.insurance, this.medicCenter, this.specialty, this.subSpecialty)
            instance.schedule(this.patient, this.medic, this.scheduleDate)
            const check = instance.checkAvailability()
            console.log(check ? "appointment done" : "appointment rejected")
        }*/
  }
}

const appointment = new Appointment(
  "Luis Antezada",
  "Pedro Quiroga",
  "Cardiología",
  "Cardiología Pediátrica",
  "2024-07-22T16:00:00Z",
  "SISOL",
  "Rimac",
  "CO"
);
console.log(appointment.makeAppointment());
