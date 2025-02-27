/**
 * This is the base request, all request will be similar to this
 * however, the type will refer to the instructions, and the args
 * will have everything that is needed.
 * You can request more args if you want.
 */

const request = {
  type: "type_of_request",
  args: ["arg1"],
  return: undefined,
};

/**
 * The main function will only take request JSON as an argument
 * The function name could be MailServies(request = request);
 */

const create_account = {
  account: -1, //-1 user mail not open, 1 user created
  details: {
    name: "Name of user",
    mail: "project1",
    user_iden: "0001110011", //ten digits number it identiy the user, must be unqie for each
  },
};

/**
 * TYPEs BASIC
 * Type one: create_account
 * Type one args: ["Name of user", "date of user", "User mail ["project1"]"]
 * Type one expected: When the user mail is open, create an account, and save it
 * ... The return will the create_account JSON
 */

const account = {
  account: -2, // account does not exists, 2 account exits,
  details: {
    ...create_account.details, //makes a copy of details.
  },
};
/**
 * TYPEs BASIC
 * Type two: login
 * Type two args: ["User mail ["project1"]"]
 * Type two expected: when the user mail exits, return account, if not return unKown
 */

const draft = {
  id: "012345678901", //mail id is 12 digits
  status: {
    ...Mail_expected.status,
  },
  content: undefined,
};

/**
 * TYPEs BASIC
 * Type three: create_draft
 * Type three args: ["user_iden"]
 * Type two expected: if the user_iden is valid, create a draft, that draft is an mail draft
 */

const Mail_expected = {
  id: "id of mail",
  status: {
    date: "data created",
    updated_last: "last date of update before sent",
    basic_status: 1, // 1 is unread, 2 is read, 3 is draft, 0 is draft
    basic_date: "date when basic_status last changed",
    inner_status: 0, // 0 is normal, 1 is spam, 2 is deleted, three is ignore/disshow
    inner_date: "date when inner_status last changed",
  },

  content: {
    user: "user_iden", // ideally this does not change
    to: ["users_idens"], // all the user to sent to upcome not draft,
    topic: "Hey, this",
    content: "This and this",
  },
};

const Mail_updated = {
  status: -3, // draft not found, 0 draft not updated, 1 draft updated.
  id: "id of mail",
  date_update: "last update",
};

/**
 * TYPEs BASIC
 * Type four: update_draft
 * Type three args: ["user_iden", "draft_id", "contantent (JSON of Mail expected)"]
 * Type three expected: return Mail_updated, with the id of mail, and the last update,
 * ...if it failed, then
 */

const send_draft = {
  status: -1, //missing something, 1 mail sent, -4 sent to user_iden not found,
  id: "id of draft",
};

/**
 * TYPEs BASIC
 * Type five: sent draft
 * Type five args: ["user_iden", "draft_id", "contents of (JSON of mail if their update and send/else sent")]
 * Type five expected: If sent, use send_draft with the information.
 */

/**
 * Important, the send draft does not show how the other users get the mail,
 * it is up to you to how you want to sort that out.
 */

const recieved_mail = {
  from: "sender email",
  name: "sender email",
  status: {
    ...Mail_expected.status,
  },
  content: {
    ...Mail_expected.content,
  },
};

/**
 * One last BASIC TYPE
 * Type LAST BASIC TYPE: view_mail
 * Type LAST BASIC TYPE args: ["user_iden", [0, 1, 2, 3, 4, 5], amount, since mail_iden]
 * Type LAST BASIC TPYE args:
 * arg one: "user_iden, the user mail",
 * arg two: if a number like 0 is their and 1, it means send mail that has Mail_expected.status.basic_status == 0 or 1,
 * ... and for 4 and 5, it is for inner_status, where 4-3, is 1 which is spam, and 5 is deleted.
 * ... for five, if it has been a week since deleted leave alone
 * arg three, the amount of mails to send back.
 * arg four, if undefined, send mails from the lastest, if not, send mail from the mail_iden to the amount needed.
 * Type LAST BASIC TYPE expected: Send back Mails
 */

/**
 * What do you think.
 */
