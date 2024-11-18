export class PatientProfile {
  firstName: string;
  lastName: string;
  street: string;
  city: string;
  country: string;
  email: string;
  username: string;
  password: string;
  professionalId: number;

  constructor(data: {
    firstName: string,
    lastName: string,
    street: string,
    city: string,
    country: string,
    email: string,
    username: string,
    password: string,
    professionalId: number
  }) {
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.street = data.street;
    this.city = data.city;
    this.country = data.country;
    this.email = data.email;
    this.username = data.username;
    this.password = data.password;
    this.professionalId = data.professionalId;
  }
}
