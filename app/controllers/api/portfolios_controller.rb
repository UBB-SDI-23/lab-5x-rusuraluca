class Api::PortfoliosController < ApplicationController
  before_action :set_portfolio, only: [:show, :edit, :update, :destroy]

  # GET api/users/:user_id/portfolios
  def index
    @portfolios = Portfolio.where(user_id: params[:user_id])
    render json: @portfolios
  end

  # GET api/users/:user_id/portfolios/:id
  def show
    render json: { user: @portfolio.user, portfolio: @portfolio, stocks: @portfolio.stocks }
  end

  # POST api/users/:user_id/portfolios
  def create
    @portfolio = Portfolio.create(portfolio_params)

    if @portfolio.save
      render json: @portfolio, status: :created, location: @portfolio
    else
      render json: @portfolio.errors, status: :unprocessable_entity
    end
  end

  def edit
  end

  # UPDATE api/users/:user_id/portfolios/:id
  def update
    if @portfolio.update(portfolio_params)
      render json: @portfolio
    else
      render json: @portfolio.errors, status: :unprocessable_entity
    end
  end

  # DELETE api/users/:user_id/portfolios/:id
  def destroy
    @portfolio.destroy
    render json: @user
  end

  private
  def set_portfolio
    @portfolio = Portfolio.find_by(user_id: params[:user_id], id: params[:id])
    @user = User.find_by(params[:user_id])
  end

  def portfolio_params
    params.require(:portfolio).permit(:name, :industry, :public, :active)
  end
end
