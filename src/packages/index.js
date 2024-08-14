import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import helmet from "helmet";
import mongoose from "mongoose";
import dotenv from "dotenv";
import request from "request";
import jwt from "jsonwebtoken";
import { Router } from "express";

export const Dependencies = {
    express,
    cookieParser,
    bodyParser,
    cors,
    bcrypt,
    helmet,
    mongoose,
    dotenv,
    request,
    jwt,
    Router,
};
