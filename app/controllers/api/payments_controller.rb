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

  def payment_count
    @pending_count = 0
    @completed_count = 0
    @overdue_count = 0
    @total_paid = 0.0

    @bill.payments.each do |pay|
      case pay.status
      when 'Pending'
        @pending_count += 1  
      when 'Completed'
        @completed_count += 1 
      when 'Overdue'
        @overdue_count += 1 
      end

      @total_paid += pay.amount
    end
    
    render json: { 
      pending_count: @pending_count,  
      completed_count: @completed_count,  
      overdue_count: @overdue_count,  
      total_paid: sprintf("%.2f", @total_paid),  
    }
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