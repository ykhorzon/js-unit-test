import {OrderService} from "../src/order_service";

describe('sync book orders', function () {
  beforeEach(() => {
    orderService = new OrderService();
  });
  let orderService = new OrderService();

  function givenOrders(orders) {
    orderService.get_orders = jest.fn().mockReturnValue(orders);
  }

  function bookDoaInsertShouldBeCalled(times) {
    expect(orderService.getBookDoa().insert).toBeCalledTimes(times);
  }

  it('should only sync book orders', () => {
    givenOrders([
      {orderType: "Book"},
      {orderType: "Food"},
      {orderType: "Book"},
    ]);
    orderService.getBookDoa = jest.fn().mockReturnValue({
      insert: jest.fn()
    });

    orderService.sync_book_orders();
    bookDoaInsertShouldBeCalled(2);
  });
});