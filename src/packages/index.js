import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import helmet from "helmet";
import mongoose from "mongoose";
import morgan from "morgan";
import dotenv from "dotenv";
import request from "request";
import jwt from "jsonwebtoken";
import moment from "moment";
import fs from "fs";
import { Router } from "express";
import { StatusCodes } from "http-status-codes";

export const Dependencies = {
    express,
    dotenv,
    mongoose,
    jwt,
    cors,
    bcrypt,
    cookieParser,
    bodyParser,
    helmet,
    morgan,
    request,
    fs,
    moment,
    Router,
    StatusCodes,
};
