class Api::NotesController < ApplicationController
  before_action :set_payment
  before_action :set_note, only: [:show, :update, :destroy]

  def index
    render json: @payment.notes
  end  
  
  def show
    render json: @note
  end
  
  def create
    @note = @payment.notes.new(note_params)
    if @note.save
      render json: @note
    else
      render json: { errors: @note.errors }, status: :unprocessable_entity
    end
  end
  
  def update
    if @note.update(note_params)
      render json: @note
    else
      render json: { errors: @note.errors }, status: :unprocessable_entity
    end
  end
  
  def destroy
    @note.destroy
    render json: { message: 'note deleted' }
  end  
  
  private
    def set_payment
      @payment = Payment.find(params[:payment_id])
    end

    def set_note
      @note = @payment.notes.find(params[:id])
    end

    def note_params
      params.require(:note).permit(:subject, :body)
    end
end
