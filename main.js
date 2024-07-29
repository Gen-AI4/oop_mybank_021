#!/usr/bin/env node
import inquirer from "inquirer";
class BankAccount {
    balance;
    transactionHistory;
    name;
    age;
    gender;
    constructor(name, age, gender) {
        this.balance = 0;
        this.transactionHistory = [];
        this.name = name;
        this.age = age;
        this.gender = gender;
    }
    deposit(amount) {
        if (amount > 0) {
            this.balance += amount;
            this.transactionHistory.push(`Deposited ${amount}`);
            console.log(`Deposited ${amount} successfully.`);
        }
        else {
            console.log("Invalid amount. Please enter a valid amount.");
        }
    }
    withdraw(amount) {
        if (amount > 0 && amount <= this.balance) {
            this.balance -= amount;
            this.transactionHistory.push(`Withdraw ${amount}`);
            console.log(`Withdraw ${amount} successfully.`);
        }
        else {
            console.log("Insufficient funds or invalid amount.");
        }
    }
    updateAccountInfo(name, age, gender) {
        this.name = name;
        this.age = age;
        this.gender = gender;
        console.log("Account information updated successfully.");
    }
    viewAccountInfo() {
        console.log(`Name: ${this.name}`);
        console.log(`Age: ${this.age}`);
        console.log(`Gender: ${this.gender}`);
        console.log(`Balance: ${this.balance}`);
    }
    checkBalance() {
        console.log(`Your balance is: ${this.balance}`);
    }
    getTransactionHistory() {
        console.log("Transaction History:");
        this.transactionHistory.forEach((transaction) => console.log(transaction));
    }
}
async function startBankManagement() {
    console.log("\n\t\t\tWelcome to the OOP Bank Management!\n");
    const { name, age, gender } = await inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Enter your name:",
        },
        {
            type: "number",
            name: "age",
            message: "Enter your age:",
        },
        {
            type: "list",
            name: "gender",
            message: "Select your gender",
            choices: ["Male", "Female", "Trans"],
        },
    ]);
    const bankAccount = new BankAccount(name, age, gender);
    while (true) {
        const { action } = await inquirer.prompt({
            type: "list",
            name: "action",
            message: "What would you like to do?",
            choices: [
                "Deposit",
                "Withdraw",
                "Update Your Account Information",
                "View Your Account Information",
                "Check Balance",
                "View Transaction History",
                "Exit",
            ],
        });
        switch (action) {
            case "Deposit": {
                const { depositAmount } = await inquirer.prompt({
                    type: "number",
                    name: "depositAmount",
                    message: "Enter your deposit amount:",
                });
                bankAccount.deposit(depositAmount);
                break;
            }
            case "Withdraw": {
                const { withdrawAmount } = await inquirer.prompt({
                    type: "number",
                    name: "withdrawAmount",
                    message: "Enter the amount to withdraw:",
                });
                bankAccount.withdraw(withdrawAmount);
                break;
            }
            case "Update Your Account Information": {
                const { newName, newAge, newGender } = await inquirer.prompt([
                    {
                        type: "input",
                        name: "newName",
                        message: "Enter your new name:",
                    },
                    {
                        type: "number",
                        name: "newAge",
                        message: "Enter your new age:",
                    },
                    {
                        type: "list",
                        name: "newGender",
                        message: "Select your new gender:",
                        choices: ["Male", "Female", "Trans"],
                    },
                ]);
                bankAccount.updateAccountInfo(newName, newAge, newGender);
                break;
            }
            case "View Your Account Information": {
                bankAccount.viewAccountInfo();
                break;
            }
            case "Check Balance": {
                bankAccount.checkBalance();
                break;
            }
            case "View Transaction History": {
                bankAccount.getTransactionHistory();
                break;
            }
            case "Exit": {
                console.log("Thank you!");
                return;
            }
        }
    }
}
startBankManagement();
