// Niubiz
// Culqi
// PayU

class Payment {
  processPayment(amount: number) {
    return "payment done";
  }
}

class PaymentCulqi extends Payment {
  override processPayment(amount: number) {
    return "payment by culqi";
  }
}

class PaymentNiubiz extends Payment {
  override processPayment(amount: number) {
    return "payment by niubiz";
  }
}

class PaymentPayU extends Payment {
  override processPayment(amount: number) {
    return "payment by payu";
  }
}

const payment = (paymentOperator: Payment, amount: number) => {
  return paymentOperator.processPayment(amount);
};

const paymentOperator1 = new PaymentCulqi();
console.log(payment(paymentOperator1, 100));

const paymentOperator2 = new PaymentNiubiz();
console.log(payment(paymentOperator2, 100));

const paymentOperator3 = new PaymentPayU();
console.log(payment(paymentOperator3, 100));
