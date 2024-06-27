class Api::PaymentsController < ApplicationController
  before_action :set_bill
  before_action :set_payment, only: [:show, :update, :destroy]

  def index
    render json: @bill.payments
  end  
  
  def show
    render json: @payment
  end
  
  def create
    @payment = @bill.payments.new(payment_params)
    if @payment.save
      render json: @payment
    else
      render json: { errors: @payment.errors }, status: :unprocessable_entity
    end
  end
  
  def update
    if @payment.update(payment_params)
      render json: @payment
    else
      render json: { errors: @payment.errors }, status: :unprocessable_entity
    end
  end
  
  def destroy
    @payment.destroy
    render json: { message: 'payment deleted' }
  end  
  
  private
    def set_bill
      @bill = Bill.find(params[:bill_id])
    end

    def set_payment
      @payment = @bill.payments.find(params[:id])
    end

    def payment_params
      params.require(:payment).permit(:amount, :whenpaid, :duedate, :status)
    end
end