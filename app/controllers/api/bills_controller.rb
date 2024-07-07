class Api::BillsController < ApplicationController
  before_action :set_bill, only: [:show, :update, :destroy]

  def index
    render json: current_user.bills
  end  
  
  def show
    render json: @bill
  end
  
  def create
    @bill = current_user.bills.new(bill_params)
    if @bill.save
      render json: @bill
    else
      render json: { errors: @bill.errors }, status: :unprocessable_entity
    end
  end
  
  def update
    if @bill.update(bill_params)
      render json: @bill
    else
      render json: { errors: @bill.errors }, status: :unprocessable_entity
    end
  end
  
  def destroy
    @bill.destroy
    render json: { message: 'Bill deleted' }
  end  

  def bill_count
    @pending_count = 0
    @completed_count = 0
    @overdue_count = 0
    @total_paid = 0.0
    @grand_bill_total = []

    current_user.bills.each do |b|
      payment_total_for_bill = 0.0
      b.payments.each do |pay|
        case pay.status
        when 'Pending'
          @pending_count += 1  
        when 'Completed'
          @completed_count += 1 
        when 'Overdue'
          @overdue_count += 1 
        end

        @total_paid += pay.amount
        payment_total_for_bill += pay.amount
      end
      @grand_bill_total << { name: b.category, bill_total: sprintf("%.2f", payment_total_for_bill) }
    end
    
    render json: { 
      pending_count: @pending_count,  
      completed_count: @completed_count,  
      overdue_count: @overdue_count,  
      total_paid: sprintf("%.2f", @total_paid),  
      grand_bill_total: @grand_bill_total,  
    }
  end
  
  def payment_by_year
    @payments_per_year = []
    
    current_user.bills.each do |b|
      b.payments.where('extract(year from whenpaid) = ?', params[:year]).each do |pay|
        if @payments_per_year.any? {|pay_hash| pay_hash[:whenpaid] == pay[:whenpaid]}
          found_hash = @payments_per_year.find {|pay_hash| pay_hash[:whenpaid] == pay[:whenpaid]}
          found_hash[:amount] = found_hash[:amount].to_f + pay.amount
        else
          @payments_per_year << { whenpaid: pay.whenpaid, amount: sprintf("%.2f", pay.amount) }
        end
      end
    end

    render json: { payments_per_year: @payments_per_year }
  end

  private
    def set_bill
      @bill = current_user.bills.find(params[:id])
    end

    def bill_params
      params.require(:bill).permit(:category)
    end
end
