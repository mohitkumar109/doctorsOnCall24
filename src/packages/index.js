import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import helmet from "helmet";
import mongoose from "mongoose";
import morgan from "morgan";
import { StatusCodes } from "http-status-codes";
import dotenv from "dotenv";
import request from "request";
import jwt from "jsonwebtoken";
import { Router } from "express";

export const Dependencies = {
    express,
    cookieParser,
    bodyParser,
    cors,
    morgan,
    bcrypt,
    helmet,
    mongoose,
    dotenv,
    request,
    jwt,
    Router,
    StatusCodes,
};
