class Api::BillsController < ApplicationController
  before_action :set_bill, only: [:show, :update, :destroy]

  def index
    render json: Bill.all
  end  
  
  def show
    render json: @bill
  end
  
  def create
    @bill = Bill.new(bill_params)
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
  
  private
    def set_bill
      @bill = Bill.find(params[:id])
    end

    def bill_params
      params.require(:bill).permit(:name, :category)
    end
end
