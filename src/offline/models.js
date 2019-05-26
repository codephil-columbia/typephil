/**
 * 	UID             string     `json:"uid"`
	CreatedAt       time.Time  `json:"createdAt"`
	UpdatedAt       time.Time  `json:"-"`
	DeletedAt       *time.Time `json:"-"`
	FirstName       string     `json:"firstName"`
	LastName        string     `json:"lastName"`
	Username        string     `json:"username"`
	Email           string     `json:"email"`
	Password        string     `json:"password"`
	Occupation      string     `json:"occupation"`
	WhichOccupation string     `json:"whichOccupation"`
 */

class User {
  constructor(
    uid,
    createdAt,
    firstName,
    lastName,
    username,
    email,
    password,
    occupation,
    whichOccupation
  ) {
    this.uid = uid;
    this.createdAt = createdAt;
    this.firstName = firstName;
    this.lastName = lastName;
    this.username = username;
    this.email = email;
    this.password = password;
    this.occupation = occupation;
    this.whichOccupation = whichOccupation;
  }
}

export { User };