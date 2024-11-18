export class ProfessionalProfile {
  id: number;
  firstName: string;
  lastName: string;
  street: string;
  city: string;
  country: string;
  email: string;
  username: string;
  password: string;
  fullName: string;

  constructor(data: {
    id: number,
    firstName: string,
    lastName: string,
    street: string,
    city: string,
    country: string,
    email: string,
    username: string,
    password: string,
    fullName: string
  }) {
    this.id = data.id;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.street = data.street;
    this.city = data.city;
    this.country = data.country;
    this.email = data.email;
    this.username = data.username;
    this.password = data.password;
    this.fullName = data.fullName;
  }
}
